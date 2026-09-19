import { useCallback, useEffect, useState } from 'react'
import type { MoneyPromise } from './types'
import { loadPromises, upsertPromise } from './storage'

export function usePromises() {
  const [promises, setPromises] = useState<MoneyPromise[]>(() => loadPromises())

  const refresh = useCallback(() => {
    setPromises(loadPromises())
  }, [])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'laterupi-promises-v1') refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refresh])

  const save = useCallback((promise: MoneyPromise) => {
    upsertPromise(promise)
    refresh()
  }, [refresh])

  return { promises, refresh, save }
}
