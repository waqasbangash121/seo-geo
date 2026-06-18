// components/analytics.ts

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      config?: Record<string, string | number | boolean>,
    ) => void;
  }
}

export const GA_ID = "G-ZC5XNC1VDY";

type GtagParams = Record<string, string | number | boolean>;

export const pageview = (url: string): void => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

export const trackEvent = (eventName: string, params?: GtagParams): void => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    event_category: "engagement",
    ...params,
  });
};
