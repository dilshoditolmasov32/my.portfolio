import { NAV, SOCIALS } from '../data/portfolio'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Reveal } from './Reveal'

// Non-breaking space so the gap between the words survives the per-letter flex layout.
const MARK = 'Mr Dilshodbek.'.split('')
const muted = 'color-mix(in srgb, var(--color-bg) 70%, transparent)'
const rule = 'var(--color-neutral-700)'
const linkStyle = { textDecoration: 'none', padding: '6px 0', fontWeight: 600 } as const

export function Footer() {
  const phone = useMediaQuery('(max-width: 599px)')
  const fullRow = phone ? { gridColumn: '1 / -1' } : undefined
  return (
    <footer style={{ background: 'var(--color-text)', color: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px,7vw,96px) clamp(20px,5vw,64px) 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: phone ? 'repeat(2,minmax(0,1fr))' : 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
            gap: '32px 40px',
            paddingBottom: 40,
            borderBottom: `2px solid ${rule}`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...fullRow }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 17 }}>
              <img src="/assets/logo-id.png" alt="" width={42} height={30} style={{ width: 42, height: 30, flex: 'none', objectFit: 'contain' }} />
              Mr Dilshodbek
            </span>
            <span style={{ fontSize: 14, color: muted }}>
              Frontend Developer &amp; IT Mentor
              <br />
              Tashkent, Uzbekistan
            </span>
          </div>
          <nav aria-label="Footer" style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 15 }}>
            {NAV.map((n) => (
              <a key={n.id} href={'#' + n.id} className="footer-link" style={linkStyle}>
                {n.label}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: 15 }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="footer-link" style={linkStyle}>
                {s.label} ↗
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: phone ? 'flex-start' : 'flex-end', alignItems: 'flex-start', ...fullRow }}>
            <a href="#home" className="btn btn-outline-on-accent" style={{ minHeight: 48, padding: '12px 16px', gap: 32, whiteSpace: 'nowrap' }}>
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            overflow: 'hidden',
            padding: 'clamp(24px,3vw,40px) 0 clamp(20px,3vw,40px)',
            fontSize: 'clamp(36px,9.6vw,140px)',
            fontWeight: 800,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            marginLeft: '-0.04em',
          }}
        >
          {MARK.map((ch, i) => (
            <Reveal as="span" key={i} delay={60 * i} style={{ display: 'block', color: ch === '.' ? 'var(--color-accent)' : 'var(--color-bg)' }}>
              {ch}
            </Reveal>
          ))}
        </div>
      </div>
    </footer>
  )
}
