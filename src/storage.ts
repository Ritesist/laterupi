import type { MoneyPromise } from './types'

const STORAGE_KEY = 'laterupi-promises-v1'

function seedPromises(): MoneyPromise[] {
  const now = new Date()
  const tonight = new Date(now)
  tonight.setHours(23, 0, 0, 0)

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(21, 4, 0, 0)

  return [
    {
      id: 'demo-pending-pizza',
      amount: 800,
      from: 'Aarav',
      to: 'Ritesh',
      dueLabel: 'Tonight',
      dueAt: tonight.toISOString(),
      note: 'pizza + Uber',
      status: 'pending',
      createdAt: now.toISOString(),
    },
    {
      id: 'demo-settled-cafe',
      amount: 350,
      from: 'Meera',
      to: 'Ritesh',
      dueLabel: 'Yesterday',
      dueAt: yesterday.toISOString(),
      note: 'cafe split',
      status: 'paid',
      createdAt: new Date(yesterday.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      settledAt: yesterday.toISOString(),
      nudgedAt: new Date(yesterday.getTime() - 60 * 60 * 1000).toISOString(),
    },
  ]
}

export function loadPromises(): MoneyPromise[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedPromises()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    return JSON.parse(raw) as MoneyPromise[]
  } catch {
    return seedPromises()
  }
}

export function savePromises(promises: MoneyPromise[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(promises))
}

export function getPromise(id: string): MoneyPromise | undefined {
  return loadPromises().find((p) => p.id === id)
}

export function upsertPromise(promise: MoneyPromise): void {
  const all = loadPromises()
  const idx = all.findIndex((p) => p.id === promise.id)
  if (idx >= 0) all[idx] = promise
  else all.unshift(promise)
  savePromises(all)
}

export function createId(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
