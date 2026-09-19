# Screens — LaterUPI MVP

Mobile-first. India INR. Soft, trustworthy money UI — not a bank app clone, not a todo list.

## Screen map

| # | Screen | Purpose |
|---|--------|---------|
| 1 | **Home** | List of promises + primary CTA to create |
| 2 | **Create** | Capture amount, parties, due, note |
| 3 | **Share card** | WhatsApp-ready nudge card / copy |
| 4 | **Status** | Pending → nudged → paid / cancelled |
| 5 | **Receipt** | Settled receipt (screenshot wow) |

---

### 1. Home

- Header: LaterUPI wordmark / short tagline  
- Tabs or filters: **Open** / **Settled** (optional for MVP: single list with badges)  
- Promise cards: amount (₹), counterparty, due chip, status pill  
- Empty state: “No promises yet — capture the next ‘I’ll UPI later’”  
- FAB / primary button: **New promise**

### 2. Create

- Amount field — large, ₹ prefix, INR  
- From / To (who owes → who receives)  
- Due: chips (Tonight · Tomorrow · Custom datetime)  
- Note (optional, 1 line)  
- Primary: **Save promise** → Status  
- Secondary: cancel / back

### 3. Share card

- Preview card: amount, names, due, short nudge line from copy bank  
- Actions: **Copy WhatsApp text** · **Share link** · **Save image** (if time)  
- Tone: human, not corporate collections  
- After share: soft confirm + optional status bump to Nudged

### 4. Status

- Hero: amount + parties  
- Timeline / pills: Pending · Nudged · Paid · Cancelled  
- Actions by state:  
  - Pending → Nudge / Share, Mark paid, Cancel  
  - Nudged → Mark paid, Nudge again, Cancel  
  - Paid → View receipt  
  - Cancelled → archive feel (read-only)

### 5. Receipt

- Full-bleed “settled” composition — the demo screenshot  
- ₹ amount large, “Settled” badge, date/time IST  
- Parties + note  
- Subtle LaterUPI mark  
- Actions: **Share receipt** · **Back to home**  
- Visual goal: side-by-side with messy WhatsApp thread = product story

---

## Navigation sketch

```
Home ──► Create ──► Status ──► Share card
                      │
                      └──► Mark paid ──► Receipt
```

Auth-lite OK (local name / magic link). No heavy OAuth unless free and fast in-window.
