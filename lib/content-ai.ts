import "server-only";

type ContentModule = "blog" | "comparison" | "resource";
type GenerationTask = "outline" | "metadata" | "faq" | "section";

type ContentGenerationRequest = {
  module: ContentModule;
  task: GenerationTask;
  title: string;
  focusKeyword?: string;
  audience?: string;
  competitorName?: string;
  existingContent?: string;
};

type OpenAIOutputItem = {
  type?: string;
  content?: Array<{ type?: string; text?: string }>;
};

type OpenAIResponse = {
  output?: OpenAIOutputItem[];
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function clean(value: string | undefined, maxLength: number): string {
  return (value ?? "").trim().slice(0, maxLength);
}

function taskInstruction(task: GenerationTask): string {
  if (task === "outline") return "Create a detailed Markdown outline with an H1, logical H2 sections, and concise notes for each section.";
  if (task === "metadata") return "Provide an SEO title, meta description, short excerpt, and 5 relevant tags. Use clear labels and no JSON.";
  if (task === "faq") return "Create 5 concise FAQ questions and direct answers in Markdown. Do not invent factual claims.";
  return "Draft one useful Markdown section with an H2 heading, clear explanation, and practical steps. Do not invent facts, performance claims, pricing, or competitor features.";
}

function moduleInstruction(module: ContentModule): string {
  if (module === "comparison") {
    return "For comparisons, stay neutral and factual. Clearly mark any claim that requires verification. Do not make unsupported statements about competitors.";
  }

  if (module === "resource") {
    return "For resources, make the output practical, structured, and implementation-focused.";
  }

  return "For blog content, prioritize reader intent, originality, clear examples, and answer-first writing.";
}

function responseText(response: OpenAIResponse): string {
  const text = response.output
    ?.flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text ?? "")
    .join("\n")
    .trim();

  if (!text) throw new Error("The content model returned no text.");
  return text;
}

export async function generateContentSuggestion(input: ContentGenerationRequest): Promise<string> {
  const apiKey = requiredEnv("CONTENT_AI_API_KEY");
  const model = requiredEnv("CONTENT_AI_MODEL");
  const title = clean(input.title, 160);

  if (!title) throw new Error("Add a title before requesting content generation.");

  const prompt = [
    "You are a careful B2B ecommerce content strategist for Hyper, a Shopify app brand.",
    moduleInstruction(input.module),
    "Write only the requested draft content. Do not state that you researched the web. Do not fabricate data, quotes, customer results, integrations, rankings, competitor details, legal claims, or citations.",
    taskInstruction(input.task),
    `Content module: ${input.module}`,
    `Working title: ${title}`,
    `Focus keyword: ${clean(input.focusKeyword, 120) || "Not set"}`,
    `Target audience: ${clean(input.audience, 180) || "Shopify merchants and ecommerce teams"}`,
    `Comparison target: ${clean(input.competitorName, 140) || "Not applicable"}`,
    `Existing draft context: ${clean(input.existingContent, 6000) || "No draft content yet"}`,
  ].join("\n\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "user",
            content: [{ type: "input_text", text: prompt }],
          },
        ],
        max_output_tokens: 1800,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Content generation request failed (${response.status}): ${message.slice(0, 180)}`);
    }

    return responseText((await response.json()) as OpenAIResponse);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Content generation timed out. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
