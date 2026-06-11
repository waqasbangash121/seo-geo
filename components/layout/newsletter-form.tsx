"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    setStatus("success");
  }

  return (
    <form onSubmit={handleSubmit} className="stack-sm" aria-label="Newsletter signup form">
      <label htmlFor="newsletter-email" className="text-sm font-medium text-foreground">
        Newsletter
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          variant="outline"
          className="sm:flex-1"
        />
        <Button type="submit" variant="primary" className="sm:w-auto">
          Subscribe
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Get product updates, launch notes, and conversion tips.
      </p>
      {status === "success" ? (
        <p className="text-xs font-medium text-foreground" role="status">
          Thanks. You are on the list.
        </p>
      ) : null}
    </form>
  );
}
