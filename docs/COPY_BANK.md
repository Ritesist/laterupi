# Copy bank — LaterUPI

Short, human, India WhatsApp tone. Not bank-speak. Not meme-spam.

Variables: `{amount}` `{from}` `{to}` `{due}` `{note}` `{date}` `{time}`

---

## WhatsApp nudge (share)

**Default**

```
Hey — quick reminder: ₹{amount} via UPI ({note}). Due {due}. Logged on LaterUPI so we don’t lose it in chat 🙂
```

**Roommate / casual**

```
bhai ₹{amount} pending ({note}) — due {due}. jab free ho UPI kar dena. card: LaterUPI
```

**Polite / freelance**

```
Hi {from} — gentle nudge for ₹{amount} ({note}), due {due}. Happy to reschedule if needed. — via LaterUPI
```

**Tonight chip**

```
Tonight reminder: ₹{amount} to {to}. Note: {note}. I’ll mark it settled once it lands.
```

**Second nudge (softer)**

```
Still open: ₹{amount} ({note}). No rush — just keeping the thread clear. Due was {due}.
```

---

## In-app microcopy

| Spot | Copy |
|------|------|
| Home empty | No promises yet. Next time someone says “I’ll UPI later,” capture it here. |
| Create CTA | New promise |
| Save | Save promise |
| Share CTA | Share nudge |
| Mark paid | Mark paid |
| Cancel | Cancel promise |
| Status pending | Waiting on UPI |
| Status nudged | Nudge sent |
| Status paid | Settled |
| Status cancelled | Cancelled |

---

## Receipt strings

**Title**

```
Settled
```

**Hero line**

```
₹{amount} settled · {date} {time}
```

**Subtitle**

```
{from} → {to}{note_suffix}
```

`note_suffix` example: ` · pizza + Uber`

**Share receipt WhatsApp**

```
Done ✅ ₹{amount} settled ({note}) · {date} {time}. Receipt on LaterUPI.
```

**Share receipt short**

```
₹{amount} settled · {date} {time} — LaterUPI
```

---

## Demo script one-liners (60–90s)

1. “This is the chat we all know — I’ll UPI later, then it disappears.”  
2. “LaterUPI turns that into a promise with a due time.”  
3. “Share a nudge that doesn’t feel like begging.”  
4. “When paid, you get a receipt you can screenshot — friendship saved, books clear.”
