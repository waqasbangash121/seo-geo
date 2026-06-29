import "server-only";

export type BlogAuditStatus = "pass" | "warning" | "error";

export type BlogAuditCheck = {
  id: string;
  label: string;
  status: BlogAuditStatus;
  message: string;
};

export type KeywordIdea = {
  phrase: string;
  reason: string;
};

export type BlogAuditDraft = {
  title?: unknown;
  slug?: unknown;
  excerpt?: unknown;
  tags?: unknown;
  focusKeyword?: unknown;
  seoTitle?: unknown;
  seoDescription?: unknown;
  content?: unknown;
};

export type BlogAuditResult = {
  generatedAt: string;
  focusKeyword: string;
  onPagePotential: {
    score: number;
    label: "Strong" | "Developing" | "Needs work";
    summary: string;
  };
  article: {
    wordCount: number;
    headingCount: number;
    questionHeadingCount: number;
    keywordMentions: number;
    checks: BlogAuditCheck[];
  };
  keywordIdeas: {
    secondary: KeywordIdea[];
    questions: KeywordIdea[];
  };
};

const ignoredWords = new Set([
  "about",
  "after",
  "also",
  "best",
  "from",
  "guide",
  "have",
  "into",
  "more",
  "most",
  "that",
  "their",
  "this",
  "using",
  "what",
  "when",
  "with",
  "your",
]);

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean)
    : [];
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function includesPhrase(value: string, phrase: string): boolean {
  const target = normalise(phrase);
  return Boolean(target) && normalise(value).includes(target);
}

function countPhrase(value: string, phrase: string): number {
  const source = normalise(value);
  const target = normalise(phrase);
  if (!target) return 0;

  let total = 0;
  let offset = 0;
  while (true) {
    const found = source.indexOf(target, offset);
    if (found < 0) return total;
    total += 1;
    offset = found + target.length;
  }
}

function wordCount(content: string): number {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_~|]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function headingLines(content: string): string[] {
  return (content.match(/^#{2,3}\s+.+$/gm) ?? []).map((heading) => heading.replace(/^#{2,3}\s+/, "").trim());
}

function introduction(content: string): string {
  return content
    .replace(/^#{1,3}\s+.*$/gm, "")
    .replace(/\n+/g, " ")
    .split(/\s+/)
    .slice(0, 110)
    .join(" ");
}

function createCheck(id: string, label: string, status: BlogAuditStatus, message: string): BlogAuditCheck {
  return { id, label, status, message };
}

function coreTerms(value: string): string[] {
  return [...new Set(normalise(value).split(" ").filter((word) => word.length > 3 && !ignoredWords.has(word)))];
}

function onPageScore(checks: BlogAuditCheck[]): number {
  const deduction = checks.reduce((total, check) => {
    if (check.status === "error") return total + 14;
    if (check.status === "warning") return total + 6;
    return total;
  }, 0);

  return Math.max(0, 100 - deduction);
}

function keywordIdeas(focusKeyword: string, tags: string[]): BlogAuditResult["keywordIdeas"] {
  const topic = focusKeyword || coreTerms(tags.join(" ")).slice(0, 3).join(" ");
  if (!topic) return { secondary: [], questions: [] };

  return {
    secondary: [
      { phrase: `${topic} strategy`, reason: "Use this for a practical approach section." },
      { phrase: `${topic} best practices`, reason: "Use this for a checklist or recommendations section." },
      { phrase: `${topic} examples`, reason: "Use this when adding scenarios or proof." },
      { phrase: `${topic} checklist`, reason: "Use this for a step-by-step section." },
    ],
    questions: [
      { phrase: `What is ${topic}?`, reason: "Answer definition intent early in the article." },
      { phrase: `How does ${topic} work?`, reason: "Use this for process intent." },
      { phrase: `How can you improve ${topic}?`, reason: "Use this for action intent." },
      { phrase: `What are the best practices for ${topic}?`, reason: "Use this for a checklist or FAQ-style section." },
    ],
  };
}

export async function runBlogAudit(input: BlogAuditDraft): Promise<BlogAuditResult> {
  const title = asString(input.title);
  const slug = asString(input.slug);
  const excerpt = asString(input.excerpt);
  const tags = asTags(input.tags);
  const focusKeyword = asString(input.focusKeyword);
  const seoTitle = asString(input.seoTitle) || title;
  const seoDescription = asString(input.seoDescription) || excerpt;
  const content = asString(input.content);
  const words = wordCount(content);
  const headings = headingLines(content);
  const questionHeadingCount = headings.filter((heading) => /\?$/.test(heading) || /^(how|what|why|when|where|which|can|should)\b/i.test(heading)).length;
  const keywordMentions = countPhrase(content, focusKeyword);
  const desiredMentions = Math.max(2, Math.min(7, Math.ceil(words / 350)));
  const checks: BlogAuditCheck[] = [];

  if (!focusKeyword) {
    checks.push(createCheck("focus-keyword", "Focus keyword", "error", "Choose one specific phrase this article should target. Example: Shopify conversion rate optimization."));
  } else {
    checks.push(createCheck("focus-keyword", "Focus keyword", "pass", `The review is optimizing this draft around “${focusKeyword}”.`));
  }

  if (!focusKeyword) {
    checks.push(createCheck("title-keyword", "Keyword in title", "warning", "Set a focus keyword to evaluate title alignment."));
  } else if (includesPhrase(title, focusKeyword)) {
    checks.push(createCheck("title-keyword", "Keyword in title", "pass", "The focus keyword appears in the title."));
  } else {
    checks.push(createCheck("title-keyword", "Keyword in title", "error", `Include “${focusKeyword}” naturally in the title, preferably near the beginning.`));
  }

  if (!focusKeyword) {
    checks.push(createCheck("slug-keyword", "Keyword in URL", "warning", "Set a focus keyword to evaluate the slug."));
  } else if (includesPhrase(slug.replace(/-/g, " "), focusKeyword)) {
    checks.push(createCheck("slug-keyword", "Keyword in URL", "pass", "The URL slug reflects the target topic."));
  } else {
    checks.push(createCheck("slug-keyword", "Keyword in URL", "warning", `Use the main words from “${focusKeyword}” in the URL slug while keeping it concise.`));
  }

  if (!focusKeyword) {
    checks.push(createCheck("excerpt-keyword", "Keyword in excerpt", "warning", "Set a focus keyword to evaluate the excerpt."));
  } else if (includesPhrase(excerpt, focusKeyword)) {
    checks.push(createCheck("excerpt-keyword", "Keyword in excerpt", "pass", "The excerpt confirms the topic and reader outcome."));
  } else {
    checks.push(createCheck("excerpt-keyword", "Keyword in excerpt", "warning", `Mention “${focusKeyword}” once in the excerpt and state what the reader will learn.`));
  }

  const focusTerms = coreTerms(focusKeyword);
  const matchingTags = tags.filter((tag) => coreTerms(tag).some((term) => focusTerms.includes(term)));
  if (tags.length < 2) {
    checks.push(createCheck("tag-keywords", "Topic tags", "warning", "Add two to four precise tags: the topic, audience, and a supporting concept."));
  } else if (focusKeyword && matchingTags.length === 0) {
    checks.push(createCheck("tag-keywords", "Topic tags", "warning", "Add a tag that matches the focus keyword or one of its core terms."));
  } else {
    checks.push(createCheck("tag-keywords", "Topic tags", "pass", "The tags add useful topical context."));
  }

  if (!focusKeyword) {
    checks.push(createCheck("seo-title-keyword", "Keyword in SEO title", "warning", "Set a focus keyword to evaluate the SEO title."));
  } else if (includesPhrase(seoTitle, focusKeyword)) {
    checks.push(createCheck("seo-title-keyword", "Keyword in SEO title", "pass", "The search title contains the focus keyword."));
  } else {
    checks.push(createCheck("seo-title-keyword", "Keyword in SEO title", "warning", `Use “${focusKeyword}” in the SEO title, then add a clear benefit or differentiator.`));
  }

  if (!focusKeyword) {
    checks.push(createCheck("seo-description-keyword", "Keyword in meta description", "warning", "Set a focus keyword to evaluate the meta description."));
  } else if (includesPhrase(seoDescription, focusKeyword)) {
    checks.push(createCheck("seo-description-keyword", "Keyword in meta description", "pass", "The meta description confirms topic relevance and reader value."));
  } else {
    checks.push(createCheck("seo-description-keyword", "Keyword in meta description", "warning", `Mention “${focusKeyword}” once in the meta description and describe the reader outcome.`));
  }

  if (words >= 900) {
    checks.push(createCheck("content-depth", "Content depth", "pass", `${words} words give the article room to answer the topic thoroughly.`));
  } else if (words >= 500) {
    checks.push(createCheck("content-depth", "Content depth", "warning", `${words} words are a useful base; add examples, steps, or evidence where readers need more depth.`));
  } else {
    checks.push(createCheck("content-depth", "Content depth", "error", `${words} words are thin for a detailed article. Build toward at least 700 useful words.`));
  }

  if (!focusKeyword) {
    checks.push(createCheck("content-keyword", "Keyword coverage", "warning", "Set a focus keyword to evaluate the body content."));
  } else if (keywordMentions === 0) {
    checks.push(createCheck("content-keyword", "Keyword coverage", "error", `Mention “${focusKeyword}” naturally in the article body, not only in metadata.`));
  } else if (keywordMentions < desiredMentions) {
    checks.push(createCheck("content-keyword", "Keyword coverage", "warning", `Use the focus keyword naturally ${desiredMentions - keywordMentions} more time${desiredMentions - keywordMentions === 1 ? "" : "s"} where it improves clarity.`));
  } else if (keywordMentions > Math.max(10, words / 45)) {
    checks.push(createCheck("content-keyword", "Keyword coverage", "warning", "The focus keyword appears very frequently. Use related terms instead of repeating the exact phrase."));
  } else {
    checks.push(createCheck("content-keyword", "Keyword coverage", "pass", `${keywordMentions} natural mentions create clear topic coverage without obvious repetition.`));
  }

  if (!focusKeyword) {
    checks.push(createCheck("intro-keyword", "Keyword in introduction", "warning", "Set a focus keyword to evaluate the introduction."));
  } else if (includesPhrase(introduction(content), focusKeyword)) {
    checks.push(createCheck("intro-keyword", "Keyword in introduction", "pass", "The introduction immediately clarifies the article topic."));
  } else {
    checks.push(createCheck("intro-keyword", "Keyword in introduction", "warning", `Use “${focusKeyword}” naturally within the first 100 words.`));
  }

  if (headings.length >= 3) {
    checks.push(createCheck("heading-coverage", "Topic structure", "pass", `${headings.length} sections create a clear answer-first structure.`));
  } else {
    checks.push(createCheck("heading-coverage", "Topic structure", "warning", "Add at least three descriptive H2 sections. Each should answer a different part of the reader’s intent."));
  }

  if (questionHeadingCount >= 2) {
    checks.push(createCheck("question-coverage", "Question coverage", "pass", "The draft uses question-led sections that can support direct-answer retrieval."));
  } else {
    checks.push(createCheck("question-coverage", "Question coverage", "warning", "Add two question-led H2 sections and answer each directly below the heading."));
  }

  const score = onPageScore(checks);
  const label = score >= 82 ? "Strong" : score >= 60 ? "Developing" : "Needs work";
  const summary =
    label === "Strong"
      ? "The draft has strong on-page topic alignment. Keep the language useful and specific for readers."
      : label === "Developing"
        ? "The topic is clear, but field-level changes can improve relevance and answer coverage."
        : "The draft needs clearer targeting and more complete answer coverage before publication.";

  return {
    generatedAt: new Date().toISOString(),
    focusKeyword,
    onPagePotential: { score, label, summary },
    article: { wordCount: words, headingCount: headings.length, questionHeadingCount, keywordMentions, checks },
    keywordIdeas: keywordIdeas(focusKeyword, tags),
  };
}
