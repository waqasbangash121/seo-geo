import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CMS_MODELS = new Set(["blog-post", "page", "api::blog-post.blog-post", "api::page.page"]);

function noIndexJson(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRAPI_REVALIDATE_SECRET;
  const webhookSecret = request.headers.get("x-cms-webhook-secret");

  if (!secret || webhookSecret !== secret) {
    return noIndexJson({ revalidated: false, message: "Unauthorized" }, 401);
  }

  const event = request.headers.get("x-strapi-event") ?? "unknown";
  const payload: unknown = await request.json().catch(() => null);
  const model =
    typeof payload === "object" && payload !== null && "model" in payload && typeof payload.model === "string"
      ? payload.model
      : null;

  if (model && !CMS_MODELS.has(model)) {
    return noIndexJson({ revalidated: false, message: "Ignored non-CMS model", event, model });
  }

  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/pages/[slug]", "page");
  revalidatePath("/sitemap.xml");

  return noIndexJson({ revalidated: true, event, model, now: Date.now() });
}
