import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StatusPill } from '../components/StatusPill'
import { Toast } from '../components/Toast'
import { formatInr, STATUS_LABEL } from '../copy'
import { getPromise, upsertPromise } from '../storage'
import type { MoneyPromise, PromiseStatus } from '../types'

const FLOW: PromiseStatus[] = ['pending', 'nudged', 'paid']

export function Status() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [tick, setTick] = useState(0)
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [toast, setToast] = useState('')

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

  function refresh() {
    setTick((n) => n + 1)
  }

  function save(next: MoneyPromise) {
    upsertPromise(next)
    refresh()
  }

  function markPaid() {
    if (!confirmPaid) {
      setConfirmPaid(true)
      return
    }
    const next: MoneyPromise = {
      ...p,
      status: 'paid',
      settledAt: new Date().toISOString(),
    }
    save(next)
    navigate(`/promise/${p.id}/receipt`)
  }

  function cancelPromise() {
    save({ ...p, status: 'cancelled' })
    setToast('Promise cancelled')
  }

  const currentIdx =
    p.status === 'paid' ? 2 : p.status === 'nudged' ? 1 : p.status === 'pending' ? 0 : -1

  return (
    <div className="app-shell">
      <div className="screen-header">
        <button type="button" className="back-btn" onClick={() => navigate('/')} aria-label="Back">
          ←
        </button>
        <div className="screen-title">Status</div>
      </div>

      <div className="panel">
        <StatusPill status={p.status} />
        <div className="hero-amount">{formatInr(p.amount)}</div>
        <div className="parties">
          {p.from} → {p.to}
        </div>
        {p.note ? <div className="note">{p.note}</div> : null}
        <div className="meta-row">
          <span className="due-chip">Due {p.dueLabel}</span>
          <span className="note" style={{ marginTop: 0 }}>
            {STATUS_LABEL[p.status]}
          </span>
        </div>

        {p.status !== 'cancelled' ? (
          <div className="timeline" aria-label="Progress">
            {FLOW.map((step, order) => {
              let cls = 'step'
              if (p.status === 'paid' && order <= 2) cls += ' done'
              else if (step === p.status) cls += step === 'pending' ? ' amber' : ' current'
              else if (order < currentIdx) cls += ' done'
              return (
                <div key={step} className={cls}>
                  {step === 'pending' ? 'Pending' : step === 'nudged' ? 'Nudged' : 'Paid'}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="note" style={{ marginTop: 16 }}>
            This promise is cancelled and read-only.
          </div>
        )}

        <div className="btn-row">
          {(p.status === 'pending' || p.status === 'nudged') && (
            <>
              <Link className="btn primary" to={`/promise/${p.id}/share`} style={{ textAlign: 'center' }}>
                {p.status === 'nudged' ? 'Share again' : 'Share nudge'}
              </Link>
              <button type="button" className="btn success" onClick={markPaid}>
                Mark paid
              </button>
              {confirmPaid ? (
                <div className="confirm-box">
                  UPI already done offline? Tap Mark paid again to confirm and open the receipt.
                </div>
              ) : null}
              <button type="button" className="btn danger" onClick={cancelPromise}>
                Cancel promise
              </button>
            </>
          )}

          {p.status === 'paid' && (
            <Link className="btn success" to={`/promise/${p.id}/receipt`} style={{ textAlign: 'center' }}>
              View receipt
            </Link>
          )}

          {p.status === 'cancelled' && (
            <button type="button" className="btn secondary" onClick={() => navigate('/')}>
              Back to home
            </button>
          )}
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  )
}
