# Content generation setup

The Content Studio uses a server-only AI configuration. It is separate from GitHub OAuth, the GitHub App publisher, and the crawler package.

## Required environment variables

Add these locally in `.env.local` and in Vercel for the environments where you want generation enabled:

```env
CONTENT_AI_API_KEY=your_openai_api_key
CONTENT_AI_MODEL=gpt-5.4-mini
```

`gpt-5.4-mini` is the recommended starting value for this writing workflow. You can switch `CONTENT_AI_MODEL` later without changing application code.

Do not prefix either variable with `NEXT_PUBLIC_`. They must never be exposed to the browser, committed to GitHub, or pasted into content fields.

## Current provider contract

The current integration sends a server-side request to the OpenAI Responses API endpoint. It uses the `CONTENT_AI_API_KEY` credential only inside `lib/content-ai.ts` and returns editable text from the protected `/api/admin/content/generate` route.

The model is intentionally configured through `CONTENT_AI_MODEL` rather than hard-coded, so you can change it without code changes.

## Safety and publishing behavior

- Only an authenticated Content Studio editor can call the route.
- The route requires a same-origin browser request.
- Requests are rate-limited per signed-in editor.
- Generated output is displayed as a suggestion only.
- The AI route never writes to GitHub, saves a draft, or publishes a page.
- The editor must explicitly append/copy the result, then use Save draft or Publish.
- Comparison prompts require factual, neutral language and tell the model not to invent competitor claims.

## Vercel setup

In the Vercel project, open **Settings → Environment Variables** and add both variables for Preview and Production as appropriate. Redeploy after adding or changing them.
