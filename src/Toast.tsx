import { useEffect } from 'react'

export function Toast({
  message,
  onDone,
}: {
  message: string
  onDone: () => void
}) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 2200)
    return () => window.clearTimeout(t)
  }, [onDone, message])

  if (!message) return null
  return <div className="toast" role="status">{message}</div>
}
