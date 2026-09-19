# Lovable prompt pack — LaterUPI

Paste **after 19 Sep 10:00 IST**. Mobile-first. India INR (₹). Soft trustworthy money UI. Receipt is the wow.

Global constraints for every prompt:
- Single mobile web app, max-width phone frame feel on desktop  
- Currency always ₹ / INR · dates in IST-friendly format  
- No bank logos as if integrated; no “UPI API” claims  
- Human India tone; English UI OK with light Hinglish empty states if natural  
- Status pills: Pending · Nudged · Paid · Cancelled  

Refs on disk: `refs/laterupi-ui-ref-1.jpg` (mobile multitask / card UI mood), `refs/laterupi-ui-ref-2.jpg` (clean settle / payment moment).

---

## 0 — Project bootstrap (paste first)

```
Build a mobile-first web app called LaterUPI.

Product: India “I’ll UPI later” money-promise tracker. Users create a promise (INR amount, who owes whom, due time, note), share a WhatsApp-ready nudge card, update status (pending → nudged → paid/cancelled), and show a beautiful settled receipt. No real bank/UPI API — marking paid is manual confirmation.

Visual: clean, modern, lots of whitespace, rounded cards, soft green for Settled, amber for Pending, blue for Nudged. Feels trustworthy like a receipt, not a neo-bank. Mobile-first (390px primary). Use ₹ for all money.

Screens: Home, Create promise, Status detail, Share card, Receipt. Simple in-memory or built-in DB for promises. Seed 2 demo promises (one pending ₹800 pizza, one settled).

Do not add auth complexity yet — optional display name field on home.
```

---

## 1 — Home

```
Create the Home screen for LaterUPI.

- Top: wordmark “LaterUPI” + subtitle “I’ll UPI later → receipt”
- List of promise cards: large ₹ amount, “A → B” parties, due chip, status pill (Pending/Nudged/Paid/Cancelled), optional one-line note
- Empty state: “No promises yet — capture the next ‘I’ll UPI later’”
- Primary FAB or bottom button: “New promise”
- Soft filters optional: Open | Settled
- Tap card → Status screen
- Mobile-first, India INR, calm trustworthy UI
```

---

## 2 — Create

```
Create the Create Promise screen for LaterUPI.

Fields:
1) Amount — large input, ₹ prefix, INR only
2) Who owes (From) and Who receives (To) — text
3) Due — chips: Tonight | Tomorrow | Custom (datetime)
4) Note — optional single line (placeholder: “pizza + Uber”)

Primary CTA: “Save promise” → goes to Status for that promise.
Secondary: Back.

Validation: amount > 0, both names required, due required.
Keep keyboard-friendly on mobile. No payment gateway.
```

---

## 3 — Share card

```
Create the Share / Nudge card screen for LaterUPI.

Show a preview card ready for WhatsApp:
- ₹{amount} prominent
- From → To
- Due line
- Short human nudge copy, e.g. “Hey — quick reminder: ₹800 via UPI (pizza + Uber). Due tonight. Logged on LaterUPI so we don’t lose it in chat 🙂”

Actions:
- Copy WhatsApp text
- Share link (web share API or copy URL)
- Optional: download card as image if easy

After successful share/copy, optionally set status to Nudged and show a soft toast “Nudge ready”.
Tone: friendly roommate/freelance India — not debt collector.
```

---

## 4 — Status

```
Create the Status detail screen for LaterUPI.

Hero: ₹ amount + From → To + note.
Status pills / simple timeline: Pending → Nudged → Paid (or Cancelled).

Actions by state:
- Pending: Share nudge, Mark paid, Cancel promise
- Nudged: Mark paid, Share again, Cancel
- Paid: View receipt
- Cancelled: read-only, back home

Mark paid asks a quick confirm (“UPI already done offline?”) then navigates to Receipt.
Keep UI calm; this is the control screen between share and receipt.
```

---

## 5 — Receipt (wow)

```
Create the Settled Receipt screen for LaterUPI — this is the product wow moment.

Full-bleed receipt composition:
- Big “Settled” badge (soft green)
- Huge ₹{amount}
- Line: “₹{amount} settled · {date} {time}” (IST-style)
- From → To + note
- Subtle LaterUPI mark at bottom
- Soft paper/card shadow, screenshot-worthy on a phone

Actions: Share receipt (copy short text: “Done ✅ ₹800 settled · 19 Sep 21:04 — LaterUPI”), Back to home.

Visual goal: looks final and fair — the opposite of a chaotic WhatsApp “bro I’ll pay” thread. Mobile-first, India INR, no fake bank branding.
```

---

## Polish pass (late window)

```
Polish LaterUPI for demo:
- Consistent spacing, 44px tap targets, status colors
- Home empty + seeded demos work
- Create → Status → Share → Mark paid → Receipt happy path under 30 seconds
- Receipt and Share card look great in screenshots
- Remove placeholder lorem; keep India INR and human copy
```
