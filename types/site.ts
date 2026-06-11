export type RouteItem = {
  label: string;
  href: string;
  description: string;
};

export type NavigationItem = RouteItem;

export type MegaMenuColumn = {
  title: string;
  links: RouteItem[];
};

export type FooterNavigationGroup = {
  title: string;
  links: RouteItem[];
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
