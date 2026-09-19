# LaterUPI

I’ll UPI later — but this time it becomes a receipt.

I’m building LaterUPI for **Hack Devengers 2.0**: a small India-first money-promise app. When someone says “bhej dunga raat ko” / “I’ll pay you tonight,” you capture it as a tracked promise, share a WhatsApp nudge card, and close it with a clean settled receipt. No bank APIs. No KYC. Just the social layer that actually breaks friendships and freelancers’ cash flow.

## Hackathon clock

| Milestone | When (IST) |
|-----------|------------|
| Kickoff / build starts | **19 Sep 2026 10:00** |
| Submission form opens | **19 Sep 2026 13:00** |
| Submit close | **20 Sep 2026 10:00** |

## Run it

```bash
cd laterupi   # or this folder
npm install
npm run dev
```

Then open the local Vite URL (usually `http://localhost:5173`). Mobile-first — resize the browser to phone width for the intended feel.

```bash
npm run build   # production bundle in dist/
```

## What’s shipping (Essential MVP)

1. **Home** — open / settled list with seeded demos (₹800 pizza pending, one settled)
2. **Create promise** — INR amount, from → to, due chips, note
3. **Status** — pending → nudged → paid / cancelled
4. **Share nudge** — WhatsApp-ready copy + copy / share actions
5. **Receipt** — settled card you can screenshot and share

Data lives in `localStorage` on your device. Marking paid is a manual confirm — no UPI or bank integration.

## Stack

Vite + React + TypeScript + React Router. Pure CSS, free only.

## Wow moment

Chaotic WhatsApp “bro I’ll UPI” thread → LaterUPI receipt: **₹800 settled · 19 Sep 21:04**.

— Ritesh
