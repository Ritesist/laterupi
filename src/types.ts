export type PromiseStatus = 'pending' | 'nudged' | 'paid' | 'cancelled'

export interface MoneyPromise {
  id: string
  amount: number
  from: string
  to: string
  dueLabel: string
  dueAt: string
  note: string
  status: PromiseStatus
  createdAt: string
  settledAt?: string
  nudgedAt?: string
}
