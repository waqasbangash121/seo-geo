import "server-only";

import type { StrapiCollectionResponse } from "./types";

const REQUEST_TIMEOUT_MS = 10_000;

function getCmsBaseUrl() {
  const value = process.env.STRAPI_URL?.trim();
  return value ? value.replace(/\/$/, "") : null;
}

function getCmsApiToken() {
  const value = process.env.STRAPI_API_TOKEN?.trim();
  return value || null;
}

export function isCmsConfigured() {
  return Boolean(getCmsBaseUrl() && getCmsApiToken());
}

function buildCmsUrl(path: string, searchParams?: URLSearchParams) {
  const baseUrl = getCmsBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const url = new URL(`${baseUrl}${path}`);

  if (searchParams) {
    url.search = searchParams.toString();
  }

  return url;
}

export async function fetchStrapiCollection<T>(
  path: string,
  searchParams?: URLSearchParams,
): Promise<StrapiCollectionResponse<T> | null> {
  const url = buildCmsUrl(path, searchParams);
  const token = getCmsApiToken();

  if (!url || !token) {
    return null;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status}) for ${path}`);
  }

  return (await response.json()) as StrapiCollectionResponse<T>;
}

export function toCmsMediaUrl(mediaUrl?: string | null) {
  if (!mediaUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(mediaUrl)) {
    return mediaUrl;
  }

  const baseUrl = getCmsBaseUrl();
  return baseUrl ? new URL(mediaUrl, `${baseUrl}/`).toString() : null;
}
