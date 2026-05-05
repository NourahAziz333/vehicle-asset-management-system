import type { ReactNode } from 'react'

export function PageHeader(props: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="pageHeader">
      <div>
        <h1 className="h1">{props.title}</h1>
        {props.subtitle ? <p className="muted">{props.subtitle}</p> : null}
      </div>
      {props.actions ? <div className="pageHeader__actions">{props.actions}</div> : null}
    </div>
  )
}

export function Card(props: { children: ReactNode }) {
  return <section className="card">{props.children}</section>
}

export function Button(props: {
  children: ReactNode
  variant?: 'primary' | 'neutral' | 'danger'
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}) {
  const v = props.variant ?? 'neutral'
  return (
    <button type={props.type ?? 'button'} className={`btn btn--${v}`} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export function Badge(props: { tone: 'good' | 'warn' | 'muted'; children: ReactNode }) {
  return <span className={`badge badge--${props.tone}`}>{props.children}</span>
}

