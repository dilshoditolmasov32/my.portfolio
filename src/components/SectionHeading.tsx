import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  num: string
  label: string
  meta?: ReactNode
  /** render the label as the section's <h2> (used by About) */
  headingId?: string
  metaAccent?: boolean
}

/** Red square · number · label · right-aligned meta, on a 2px top rule. */
export function SectionHeading({ num, label, meta, headingId, metaAccent }: Props) {
  return (
    <Reveal
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        paddingTop: 16,
        borderTop: '2px solid var(--color-divider)',
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFeatureSettings: "'tnum' 1",
      }}
    >
      <span style={{ width: 10, height: 10, background: 'var(--color-accent)', flex: 'none' }} />
      <span style={{ color: 'var(--color-accent-700)', fontWeight: 800 }}>{num}</span>
      {headingId ? (
        <h2 id={headingId} style={{ margin: 0, fontSize: 13, letterSpacing: '0.08em' }}>
          {label}
        </h2>
      ) : (
        <span style={{ fontWeight: 800 }}>{label}</span>
      )}
      {meta && (
      <span
        style={{
          marginLeft: 'auto',
          whiteSpace: 'nowrap',
          color: metaAccent ? 'var(--color-accent-700)' : 'color-mix(in srgb, var(--color-text) 70%, transparent)',
          fontWeight: metaAccent ? 800 : undefined,
        }}
      >
        {meta}
      </span>
      )}
    </Reveal>
  )
}

