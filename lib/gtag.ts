declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

export const GA_ID = "G-ZC5XNC1VDY";

/**
 * Track page views (GA4)
 */
export const pageview = (url: string): void => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

/**
 * Track custom events
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void => {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    event_category: "engagement",
    ...params,
  });
};
