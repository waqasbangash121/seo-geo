import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CMS_MODELS = new Set(["blog-post", "page", "api::blog-post.blog-post", "api::page.page"]);
const NO_INDEX_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function noIndexJson(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: NO_INDEX_HEADERS,
  });
}

export function GET() {
  return noIndexJson({ message: "This endpoint accepts Strapi webhook POST requests only." }, 405);
}

export function HEAD() {
  return new NextResponse(null, {
    status: 405,
    headers: NO_INDEX_HEADERS,
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
