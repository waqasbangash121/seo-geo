export type RouteItem = {
  label: string;
  href: string;
  description: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  description: string;
  url: string;
  email: string;
  locale: string;
  keywords: string[];
  iconPath: string;
  ogImagePath: string;
};