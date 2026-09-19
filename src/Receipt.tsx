import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from '../components/Toast'
import { formatInr, formatIstDateTime, receiptShort, receiptWhatsApp } from '../copy'
import { getPromise } from '../storage'

export function Receipt() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const promise = useMemo(() => getPromise(id), [id])

  if (!promise || promise.status !== 'paid') {
    return (
      <div className="app-shell">
        <div className="empty">Receipt available after you mark paid.</div>
        <button
          type="button"
          className="fab"
          onClick={() => navigate(promise ? `/promise/${promise.id}` : '/')}
        >
          Go back
        </button>
      </div>
    )
  }

  const p = promise
  const settled = p.settledAt || new Date().toISOString()
  const noteSuffix = p.note ? ` · ${p.note}` : ''

  async function shareReceipt() {
    const text = receiptWhatsApp(p)
    try {
      if (navigator.share) {
        await navigator.share({ title: 'LaterUPI receipt', text })
        setToast('Receipt shared')
        return
      }
      await navigator.clipboard.writeText(receiptShort(p))
      setToast('Receipt text copied')
    } catch {
      try {
        await navigator.clipboard.writeText(receiptShort(p))
        setToast('Receipt text copied')
      } catch {
        setToast('Could not share')
      }
    }
  }

  return (
    <div className="app-shell">
      <div className="screen-header">
        <button type="button" className="back-btn" onClick={() => navigate('/')} aria-label="Home">
          ←
        </button>
        <div className="screen-title">Receipt</div>
      </div>

      <div className="receipt">
        <div className="settled-badge">✓ Settled</div>
        <div className="hero-amount">{formatInr(p.amount)}</div>
        <div className="receipt-line">
          {formatInr(p.amount)} settled · {formatIstDateTime(settled)}
        </div>
        <div className="receipt-parties">
          {p.from} → {p.to}
          {noteSuffix}
        </div>
        <div className="receipt-mark">LaterUPI</div>
      </div>

      <div className="btn-row" style={{ marginTop: 16 }}>
        <button type="button" className="btn primary" onClick={shareReceipt}>
          Share receipt
        </button>
        <button type="button" className="btn secondary" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  )
}
