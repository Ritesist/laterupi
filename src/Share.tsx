import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StatusPill } from '../components/StatusPill'
import { Toast } from '../components/Toast'
import { formatInr, nudgeWhatsApp } from '../copy'
import { getPromise, upsertPromise } from '../storage'
import type { MoneyPromise } from '../types'

export function Share() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const [tick, setTick] = useState(0)

  const promise = useMemo(() => getPromise(id), [id, tick])

  if (!promise) {
    return (
      <div className="app-shell">
        <div className="empty">Promise not found.</div>
        <button type="button" className="fab" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    )
  }

  const p = promise
  const text = nudgeWhatsApp(p)

  async function bumpNudged() {
    if (p.status === 'pending') {
      const next: MoneyPromise = {
        ...p,
        status: 'nudged',
        nudgedAt: new Date().toISOString(),
      }
      upsertPromise(next)
      setTick((n) => n + 1)
    }
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text)
      await bumpNudged()
      setToast('Nudge ready — copied')
    } catch {
      setToast('Could not copy — select the text manually')
    }
  }

  async function shareLink() {
    const url = window.location.origin + `/promise/${p.id}`
    const payload = { title: 'LaterUPI nudge', text, url }
    try {
      if (navigator.share) {
        await navigator.share(payload)
        await bumpNudged()
        setToast('Nudge ready')
        return
      }
      await navigator.clipboard.writeText(`${text}\n${url}`)
      await bumpNudged()
      setToast('Link + text copied')
    } catch {
      /* user cancelled share */
    }
  }

  return (
    <div className="app-shell">
      <div className="screen-header">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(`/promise/${p.id}`)}
          aria-label="Back"
        >
          ←
        </button>
        <div className="screen-title">Share nudge</div>
      </div>

      <div className="share-preview">
        <StatusPill status={p.status} />
        <div className="hero-amount">{formatInr(p.amount)}</div>
        <div className="parties">
          {p.from} → {p.to}
        </div>
        <div className="meta-row">
          <span className="due-chip">Due {p.dueLabel}</span>
        </div>
        <div className="nudge-text">{text}</div>
      </div>

      <div className="btn-row">
        <button type="button" className="btn primary" onClick={copyText}>
          Copy WhatsApp text
        </button>
        <button type="button" className="btn secondary" onClick={shareLink}>
          Share link
        </button>
        <button type="button" className="btn secondary" onClick={() => navigate(`/promise/${p.id}`)}>
          Back to status
        </button>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  )
}
