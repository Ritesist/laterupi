import type { MoneyPromise } from './types'

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatIstDateTime(iso: string): string {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Kolkata',
  })
  const time = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  })
  return `${date} ${time}`
}

export function nudgeWhatsApp(p: MoneyPromise): string {
  const amount = p.amount.toLocaleString('en-IN')
  const note = p.note || 'UPI'
  return `Hey — quick reminder: ₹${amount} via UPI (${note}). Due ${p.dueLabel.toLowerCase()}. Logged on LaterUPI so we don’t lose it in chat 🙂`
}

export function receiptWhatsApp(p: MoneyPromise): string {
  const amount = p.amount.toLocaleString('en-IN')
  const when = formatIstDateTime(p.settledAt || new Date().toISOString())
  const note = p.note ? ` (${p.note})` : ''
  return `Done ✅ ₹${amount} settled${note} · ${when}. Receipt on LaterUPI.`
}

export function receiptShort(p: MoneyPromise): string {
  const amount = p.amount.toLocaleString('en-IN')
  const when = formatIstDateTime(p.settledAt || new Date().toISOString())
  return `₹${amount} settled · ${when} — LaterUPI`
}

export const STATUS_LABEL: Record<string, string> = {
  pending: 'Waiting on UPI',
  nudged: 'Nudge sent',
  paid: 'Settled',
  cancelled: 'Cancelled',
}

export const STATUS_PILL: Record<string, string> = {
  pending: 'Pending',
  nudged: 'Nudged',
  paid: 'Settled',
  cancelled: 'Cancelled',
}
