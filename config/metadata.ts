import type { Metadata, Viewport } from "next";

import { siteConfig } from "./site";

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImagePath],
  },
  icons: {
    icon: siteConfig.iconPath,
    shortcut: siteConfig.iconPath,
    apple: siteConfig.iconPath,
  },
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    ...defaultMetadata,
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: new URL(path, siteConfig.url).toString(),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}