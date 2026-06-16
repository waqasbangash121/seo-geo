import type { FooterNavigationGroup, MegaMenuColumn, RouteItem } from "@/types";

export const primaryNavigation: RouteItem[] = [
  { label: "Home", href: "/", description: "Hyper homepage" },
  { label: "Apps", href: "/apps", description: "Shopify apps and product suite" },
  //{ label: "Industries", href: "/industries", description: "Industry playbooks" },
  { label: "Comparisons", href: "/comparisons", description: "Compare Hyper against alternatives" },
  { label: "Resources", href: "/resources", description: "Guides and documentation" },
  { label: "Blog", href: "/blog", description: "Hyper insights and updates" },
  //{ label: "Case Studies", href: "/case-studies", description: "Customer results and proof" },
  //{ label: "Tools", href: "/tools", description: "Free utility tools" },
  { label: "Contact", href: "/contact", description: "Contact Hyper" },
];

export const appsMegaMenu: MegaMenuColumn[] = [
  {
    title: "Products",
    links: [
      {
        label: "Search & Filter",
        href: "/apps",
        description: "Merchandising-focused search and filters",
      },
      {
        label: "AI Chat and FAQs",
        href: "/apps",
        description: "AI support and pre-sales assistant",
      },
      {
        label: "Shoppable Video",
        href: "/apps",
        description: "Video commerce experiences for conversion",
      },
    ],
  },
  // {
  //   title: "Use Cases",
  //   links: [
  //     {
  //       label: "Conversion Optimization",
  //       href: "/comparisons",
  //       description: "Improve product discovery and revenue",
  //     },
  //     {
  //       label: "Support Deflection",
  //       href: "/resources",
  //       description: "Reduce repetitive support tickets",
  //     },
  //     {
  //       label: "Storefront Engagement",
  //       href: "/case-studies",
  //       description: "Increase session depth and retention",
  //     },
  //   ],
  // },
  // {
  //   title: "Explore",
  //   links: [
  //     {
  //       label: "Pricing and Plans",
  //       href: "/apps",
  //       description: "Find the right plan for your store",
  //     },
  //     {
  //       label: "Implementation Guides",
  //       href: "/resources",
  //       description: "Technical and onboarding guides",
  //     },
  //     { label: "Book a Demo", href: "/contact", description: "Talk to product specialists" },
  //   ],
  // },
];

export const footerNavigation: FooterNavigationGroup[] = [
  {
    title: "Products",
    links: [
      { label: "Apps", href: "/apps", description: "Hyper app suite" },
      { label: "Comparisons", href: "/comparisons", description: "Feature comparison pages" },
      { label: "Tools", href: "/tools", description: "Free and premium tools" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resources", href: "/resources", description: "Guides and playbooks" },
      { label: "Blog", href: "/blog", description: "Articles and updates" },
      { label: "Case Studies", href: "/case-studies", description: "Customer outcomes" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy", description: "How we handle data" },
      { label: "Terms", href: "/terms", description: "Terms of service" },
      { label: "Cookie Policy", href: "/cookie-policy", description: "Cookie usage details" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X", href: "https://x.com", description: "Follow Hyper on X" },
      { label: "LinkedIn", href: "https://linkedin.com", description: "Connect on LinkedIn" },
      { label: "GitHub", href: "https://github.com", description: "Explore code and releases" },
    ],
  },
];

export const siteRoutes: RouteItem[] = primaryNavigation;
