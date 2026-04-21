# Own Your Space - Free Growth Audit

A polished landing page for a fictional free website/growth audit service. Built as a front-end engineering assessment.

---

## Stack

- **Next.js 16.2.3** (App Router)
- **React 19.2.1**
- **TypeScript 5.7** - strict mode, zero `any`
- **Tailwind CSS 3.4** - custom design
- **No external UI libraries** - all icons are handcrafted SVGs

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Start the Turbopack dev server (default in Next.js 16) |
| `npm run build`     | Production build                                       |
| `npm run start`     | Run the production build                               |
| `npm run typecheck` | Run `tsc --noEmit` - zero errors expected              |
| `npm run lint`      | Lint                                                   |

## Design decisions

### Visual language

Warm off-white canvas (`#faf9f6`), off-black ink (`#111111`), a singular vibrant accent (`#ff5600`), sharp 4-pixel buttons, warm oat-toned borders, and editorial italic serif moments against a geometric sans. Designed as a system, not a page.

Typography pairs **Inter** (geometric sans), **Instrument Serif** (italic editorial accents), and **JetBrains Mono** (uppercase labels). All Google Fonts - no licensing concerns, no layout shift (next/font handles that).

### API routes

#### `POST /api/audit`

Validates using the shared `lib/validation.ts` module, normalises the URL, generates a `crypto.randomUUID()` submission ID + timestamp, calls a stubbed `forwardToCRM()` function. The stub has inline comments showing how to swap it for HubSpot, Prisma, Resend, etc. without touching validation or response shape.

**Response shape:**

- `200 → { ok: true, id: string }`
- `400 → { ok: false, message: string, errors?: Record<field, msg> }`
- `500 → { ok: false, message: string }`

Rejects non-POST methods with a `405 + Allow: POST` header.

#### `POST /api/preview`

Lightweight endpoint that powers the "quick peek" card. Small artificial delay (~320ms) so the loading state reads as intentional. Cache-Control header caps repeated hits on the same URL.

**Design note in the route file:** we deliberately don't fetch the user's site. Scraping is unreliable at demo time (timeouts, bot-blocking) and the interaction value is the _curiosity → submit_ loop, not the literal analysis. The actual audit happens after submission, by a human.

### Validation as a shared module

`lib/validation.ts` is used by **both** the client (for real-time feedback) and the API route (as a trust boundary). The two can never drift because they import the same functions. This is the pattern I'd use in production and it keeps the code base tiny.

### Component boundaries

Only **two** client components in the tree: `AuditForm` and `MiniAuditPreview`. Everything else is a Server Component. This keeps the JS payload small - the hero, benefits, logo strip, and testimonial all render on the server with zero client JS.

---

## What I'd do next

Not built to keep scope tight, but ordered by what I'd ship first:

1. **Real server-side rate limiting** on `/api/preview` and `/api/audit` - right now someone could flood either endpoint. A simple token-bucket keyed by IP would be the minimum.
2. **Real analyser** for the preview route - fetch the URL with a 4s timeout, run a small Cheerio pass for title length, meta description, viewport tag, H1 presence. Keep the tease pattern but reveal real findings.
3. **E2E tests** - Playwright covering: empty submit, invalid inputs, happy path, preview debounce, preview cancellation, keyboard nav, reset flow.
4. **Form persistence** - save draft to localStorage every change so a refresh doesn't lose work.
5. **CRM integration** - wire `forwardToCRM` to HubSpot or a Postgres table.

---

## Notes for reviewers

- **No UI kit, no component libraries.** Every interactive element is hand-built.
- **Single source of truth** for validation - same functions run on client and server.
- **Goal chips are accessible.** They look like chips but are backed by a real `<select>` in the DOM plus full ARIA radiogroup semantics. Brief says "dropdown" but chips are better mobile UX.
- **Locked preview items are framed as categories, never findings.** Deliberate choice to keep the curiosity gap honest.
