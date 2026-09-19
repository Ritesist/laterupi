import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createId, upsertPromise } from '../storage'
import type { MoneyPromise } from '../types'

type DueChoice = 'tonight' | 'tomorrow' | 'custom'

function endOfTonight(): Date {
  const d = new Date()
  d.setHours(23, 0, 0, 0)
  return d
}

function endOfTomorrow(): Date {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  d.setHours(21, 0, 0, 0)
  return d
}

export function Create() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('Ritesh')
  const [note, setNote] = useState('')
  const [dueChoice, setDueChoice] = useState<DueChoice>('tonight')
  const [customDue, setCustomDue] = useState('')
  const [error, setError] = useState('')

  const dueMeta = useMemo(() => {
    if (dueChoice === 'tonight') {
      return { label: 'Tonight', at: endOfTonight().toISOString() }
    }
    if (dueChoice === 'tomorrow') {
      return { label: 'Tomorrow', at: endOfTomorrow().toISOString() }
    }
    if (!customDue) return { label: '', at: '' }
    const d = new Date(customDue)
    const label = d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    })
    return { label, at: d.toISOString() }
  }, [dueChoice, customDue])

  function onSave() {
    const parsed = Number(amount.replace(/,/g, ''))
    if (!parsed || parsed <= 0) {
      setError('Enter an amount greater than 0')
      return
    }
    if (!from.trim() || !to.trim()) {
      setError('Both From and To are required')
      return
    }
    if (!dueMeta.at) {
      setError('Pick a due time')
      return
    }

    const promise: MoneyPromise = {
      id: createId(),
      amount: Math.round(parsed),
      from: from.trim(),
      to: to.trim(),
      dueLabel: dueMeta.label,
      dueAt: dueMeta.at,
      note: note.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    upsertPromise(promise)
    navigate(`/promise/${promise.id}`, { replace: true })
  }

  return (
    <div className="app-shell">
      <div className="screen-header">
        <button type="button" className="back-btn" onClick={() => navigate(-1)} aria-label="Back">
          ←
        </button>
        <div className="screen-title">New promise</div>
      </div>

      <div className="panel">
        <div className="field">
          <label htmlFor="amount">Amount (INR)</label>
          <div className="amount-input">
            <span>₹</span>
            <input
              id="amount"
              inputMode="numeric"
              placeholder="800"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
            />
          </div>
        </div>

        <div className="row-2">
          <div className="field">
            <label htmlFor="from">Who owes (From)</label>
            <input
              id="from"
              placeholder="Aarav"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="to">Who receives (To)</label>
            <input
              id="to"
              placeholder="Ritesh"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label>Due</label>
          <div className="due-chips">
            <button
              type="button"
              className={`chip ${dueChoice === 'tonight' ? 'active' : ''}`}
              onClick={() => setDueChoice('tonight')}
            >
              Tonight
            </button>
            <button
              type="button"
              className={`chip ${dueChoice === 'tomorrow' ? 'active' : ''}`}
              onClick={() => setDueChoice('tomorrow')}
            >
              Tomorrow
            </button>
            <button
              type="button"
              className={`chip ${dueChoice === 'custom' ? 'active' : ''}`}
              onClick={() => setDueChoice('custom')}
            >
              Custom
            </button>
          </div>
          {dueChoice === 'custom' ? (
            <input
              type="datetime-local"
              value={customDue}
              onChange={(e) => setCustomDue(e.target.value)}
              style={{ marginTop: 8 }}
            />
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="note">Note (optional)</label>
          <input
            id="note"
            placeholder="pizza + Uber"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={80}
          />
        </div>

        {error ? <div className="error">{error}</div> : null}

        <div className="btn-row">
          <button type="button" className="btn primary" onClick={onSave}>
            Save promise
          </button>
          <button type="button" className="btn secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
