"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const COOKIE_KEY = "hyper-cookie-consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = window.localStorage.getItem(COOKIE_KEY) === "accepted";
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(COOKIE_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-surface/95 py-3 backdrop-blur"
      aria-label="Cookie consent banner"
    >
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use cookies to improve performance and personalize your experience.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
            Dismiss
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            Accept cookies
          </Button>
        </div>
      </Container>
    </aside>
  );
}
