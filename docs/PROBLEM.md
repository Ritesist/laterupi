# Problem — LaterUPI

## The India “I’ll UPI later” pain

In India, UPI made paying instant — but **promising** to pay stayed messy.

Roommates split dinner. College groups pool for tickets. Freelancers invoice a friend-of-a-friend. Someone says:

> “Kal bhej dunga”  
> “Raat ko UPI”  
> “Bro I’ll pay you tonight”

Then the chat scrolls. Nobody remembers the amount. Nudging feels awkward. Settling feels like arguing. Money and friendship both take the hit.

Banks and UPI apps solve **transfer**. They don’t solve **the informal IOU** — the social contract before the rupees move.

**LaterUPI** turns that casual promise into:

1. A tracked promise (amount, parties, due time)  
2. A shareable nudge card (WhatsApp-native tone)  
3. A settled receipt that feels final and fair

No bank integration in the MVP. The product is the promise → nudge → receipt loop.

---

## Three user flows

### Flow A — Create promise

**Who:** Person owed money (or either party recording the deal).  
**Trigger:** Someone just said “I’ll UPI later” in person or chat.

1. Open LaterUPI → **Create**  
2. Enter **amount in ₹** (INR)  
3. Set **who owes whom** (names / handles)  
4. Set **due** (tonight, tomorrow, custom time)  
5. Optional **note** (“pizza + Uber”, “hostel mess”, “design fee”)  
6. Save → land on **status** (Pending)

**Outcome:** One clear promise object instead of a buried chat line.

---

### Flow B — Share nudge

**Who:** Person waiting to get paid.  
**Trigger:** Due time approaching, or gentle follow-up needed.

1. Open promise → **Share** / **Nudge**  
2. See a **share card** (amount, due, short human line)  
3. Copy WhatsApp text **or** share link / card image  
4. Paste into WhatsApp / chat  
5. Status moves **Pending → Nudged** (optional timestamp)

**Outcome:** A polite, specific reminder — not “bhej de yaar” with zero context.

---

### Flow C — Settle receipt

**Who:** Either party after UPI actually happened (off-app).  
**Trigger:** Money sent / received; both agree it’s done.

1. Open promise → **Mark paid**  
2. Optional: note settlement time / short confirmation  
3. Generate **receipt** screen  
4. Screenshot or share receipt card  
5. Status → **Paid** (or **Cancelled** if abandoned)

**Outcome:** A clean “₹X settled · date time” artifact — the wow vs. endless chat archaeology.

---

## Out of scope (MVP)

- Real UPI / bank / KYC APIs  
- Credit scoring, collections, interest  
- Multi-tenant SaaS / org billing  
- Crypto  

Keep scope to create → share → nudge → paid → receipt so the 24h build stays shippable.
