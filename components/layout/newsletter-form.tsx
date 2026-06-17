"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error);
        return;
      }

      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stack-sm" aria-label="Newsletter signup">
      <label htmlFor="newsletter-email" className="text-sm font-medium text-foreground"></label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sm:flex-1"
        />

        <Button type="submit" variant="primary">
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Get product updates, launch notes, and conversion tips.
      </p>

      {status === "success" && (
        <p className="text-xs font-medium text-green-600" role="status">
          Thanks! Youre on the list.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-600" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
