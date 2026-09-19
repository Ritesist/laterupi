import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PromiseCard } from '../components/PromiseCard'
import { usePromises } from '../hooks'

type Filter = 'open' | 'settled' | 'all'

export function Home() {
  const navigate = useNavigate()
  const { promises } = usePromises()
  const [filter, setFilter] = useState<Filter>('open')

  const filtered = useMemo(() => {
    if (filter === 'all') return promises
    if (filter === 'settled') {
      return promises.filter((p) => p.status === 'paid' || p.status === 'cancelled')
    }
    return promises.filter((p) => p.status === 'pending' || p.status === 'nudged')
  }, [promises, filter])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="wordmark">LaterUPI</div>
        <div className="tagline">I’ll UPI later → receipt</div>
      </header>

      <div className="filters" role="tablist" aria-label="Filter promises">
        <button
          type="button"
          className={`chip ${filter === 'open' ? 'active' : ''}`}
          onClick={() => setFilter('open')}
        >
          Open
        </button>
        <button
          type="button"
          className={`chip ${filter === 'settled' ? 'active' : ''}`}
          onClick={() => setFilter('settled')}
        >
          Settled
        </button>
        <button
          type="button"
          className={`chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          No promises yet — capture the next “I’ll UPI later”
        </div>
      ) : (
        <div className="card-list">
          {filtered.map((p) => (
            <PromiseCard key={p.id} promise={p} />
          ))}
        </div>
      )}

      <button type="button" className="fab" onClick={() => navigate('/create')}>
        New promise
      </button>
    </div>
  )
}
