import { NextResponse } from "next/server";

/**
 * Some development environments inject a client-side Manus logger that posts to
 * /__manus__/logs. This app does not use Manus logging, but returning 204 keeps
 * that optional request from producing noisy 404 warnings in local development.
 */
function noContent() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST() {
  return noContent();
}

export async function OPTIONS() {
  return noContent();
}
