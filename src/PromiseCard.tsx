import { Link } from 'react-router-dom'
import type { MoneyPromise } from '../types'
import { formatInr } from '../copy'
import { StatusPill } from './StatusPill'

export function PromiseCard({ promise }: { promise: MoneyPromise }) {
  return (
    <Link to={`/promise/${promise.id}`} className="promise-card">
      <div className="promise-card-top">
        <div>
          <div className="amount">{formatInr(promise.amount)}</div>
          <div className="parties">
            {promise.from} → {promise.to}
          </div>
        </div>
        <StatusPill status={promise.status} />
      </div>
      <div className="meta-row">
        <span className="due-chip">Due {promise.dueLabel}</span>
      </div>
      {promise.note ? <div className="note">{promise.note}</div> : null}
    </Link>
  )
}
