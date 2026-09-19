import type { PromiseStatus } from '../types'
import { STATUS_PILL } from '../copy'

export function StatusPill({ status }: { status: PromiseStatus }) {
  return <span className={`pill ${status}`}>{STATUS_PILL[status]}</span>
}
