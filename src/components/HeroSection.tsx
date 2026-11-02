import { useRef, type PointerEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SOCIALS } from '../data/portfolio'
import { useNarrow } from '../hooks/useMediaQuery'
import { useTypewriter } from '../hooks/useTypewriter'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { Terminal } from './Terminal'

// The hero sits on the dark ink field, so text is drawn in the light "bg" colour with red accents.
const muted = 'color-mix(in srgb, var(--color-bg) 82%, transparent)'
const rule = 'color-mix(in srgb, var(--color-bg) 45%, transparent)'
const gridLine = 'color-mix(in srgb, var(--color-bg) 20%, transparent)'
const GRID = 24

interface Props {
  showGrid?: boolean
  autoplay?: boolean
}

export function HeroSection({ showGrid = true, autoplay = true }: Props) {
  const narrow = useNarrow()
  const reduced = useReducedMotion() ?? false
  const surname = useTypewriter('Itolmasov', reduced)
  const heroRef = useRef<HTMLElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)

  // Snapping cursor marker — mouse only, never hides the native cursor.
  const onMove = (e: PointerEvent) => {
    const hero = heroRef.current
    const marker = markerRef.current
    if (e.pointerType !== 'mouse' || !hero || !marker) return
    const r = hero.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    marker.style.opacity = '1'
    marker.style.transform = `translate(${Math.floor(x / GRID) * GRID + 6}px, ${Math.floor(y / GRID) * GRID + 6}px)`
  }
  const onLeave = () => {
    if (markerRef.current) markerRef.current.style.opacity = '0'
  }

  return (
    <section
      id="home"
      ref={heroRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label="Introduction"
      style={{
        position: 'relative',
        scrollMarginTop: 66,
        isolation: 'isolate',
        background: 'var(--color-text)',
        color: 'var(--color-bg)',
      }}
    >
      {showGrid && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(20px,5vw,64px)',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(12,1fr)',
              borderRight: `1px solid ${gridLine}`,
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ borderLeft: `1px solid ${gridLine}` }} />
            ))}
          </div>
        </div>
      )}
      <div
        ref={markerRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          background: 'var(--color-accent)',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'transform .2s cubic-bezier(.2,.7,.1,1), opacity .25s',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(20px,5vw,64px) clamp(32px,4vw,56px)',
        }}
      >
        {/* First screen: the name block is centred vertically in the viewport below the header */}
        <div
          style={{
            minHeight: 'calc(100svh - 66px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(32px,5vw,64px) 0',
          }}
        >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) clamp(280px,34vw,440px)',
            gridTemplateRows: '1fr auto auto auto 1fr',
            columnGap: 'clamp(32px,5vw,72px)',
            rowGap: 'clamp(16px,2vw,24px)',
          }}
        >
          <Reveal
            as="p"
            style={{
              gridColumn: 1,
              gridRow: 2,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 'clamp(15px,1.4vw,19px)',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-bg)',
            }}
          >
            <span aria-hidden="true" style={{ width: 12, height: 12, background: 'var(--color-accent)', flex: 'none' }} />
            Keep Learning, Don't Stop.
          </Reveal>

          <Reveal
            as="figure"
            delay={240}
            className="portrait"
            style={{
              gridColumn: narrow ? 1 : 2,
              gridRow: narrow ? 5 : '1 / span 5',
              margin: 0,
              width: '100%',
              maxWidth: 460,
              minWidth: 0,
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--color-surface)', borderRadius: 16 }}>
              <img
                src="/assets/portrait.jpg"
                alt="Portrait of Dilshodbek Itolmasov"
                className="grayscale"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }}
              />
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 14, background: 'var(--color-accent)' }} />
            </div>
          </Reveal>

          <div style={{ gridColumn: 1, gridRow: 3, minWidth: 0, containerType: 'inline-size' }}>
            <h1
              style={{
                margin: '0 0 0 -0.05em',
                fontSize: '18cqi',
                lineHeight: 0.86,
                letterSpacing: '-0.05em',
                fontWeight: 800,
                color: 'var(--color-bg)',
              }}
            >
              <Reveal as="span" delay={60} style={{ display: 'block' }}>
                Dilshodbek
              </Reveal>
              <span style={{ display: 'flex', alignItems: 'baseline', marginTop: '0.12em' }}>
                <Reveal
                  as="span"
                  delay={180}
                  className="name-outline"
                  style={{ display: 'block', color: 'transparent', WebkitTextStroke: '0.016em var(--color-bg)' }}
                >
                  <span className="sr-only">Itolmasov</span>
                  <span aria-hidden="true">{surname.text || '\u200B'}</span>
                </Reveal>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    width: '0.16em',
                    height: '0.16em',
                    marginLeft: '0.04em',
                    background: 'var(--color-accent)',
                    animation: reduced || surname.typing ? 'none' : 'caret 1s steps(1) infinite',
                  }}
                />
              </span>
            </h1>
          </div>

          <Reveal
            as="p"
            delay={300}
            style={{
              gridColumn: 1,
              gridRow: 4,
              margin: 'clamp(12px,2vw,28px) 0 0',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '6px 20px',
              fontSize: 'clamp(17px,1.7vw,24px)',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            <span>Frontend Developer &amp; IT Mentor</span>
          </Reveal>
        </div>
        </div>

        <div
          style={{
            marginTop: 'clamp(8px,2vw,24px)',
            borderTop: '2px solid var(--color-bg)',
            paddingTop: 'clamp(24px,3vw,40px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))',
            gap: 'clamp(32px,5vw,72px)',
          }}
        >
          <Reveal delay={380} style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 'clamp(18px,1.6vw,21px)', lineHeight: 1.5, maxWidth: '36ch' }}>
              I build modern, responsive web applications with React, Next.js, Vue and TypeScript — clean code,
              intuitive UI/UX, and digital products that make an impact.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href="#projects"
                className="btn btn-primary"
                style={{ minHeight: 52, padding: '14px 18px', fontSize: 15, gap: 40, justifyContent: 'flex-start' }}
              >
                View my work <span aria-hidden="true">↓</span>
              </a>
              <a
                href="#contact"
                className="btn btn-outline-on-accent"
                style={{ minHeight: 52, padding: '14px 18px', fontSize: 15, gap: 40, justifyContent: 'flex-start' }}
              >
                Let's connect <span aria-hidden="true">→</span>
              </a>
            </div>
            <ul
              aria-label="Social profiles"
              style={{ listStyle: 'none', margin: 'auto 0 0', padding: 0, borderTop: `1px solid ${rule}` }}
            >
              {SOCIALS.map((s) => (
                <li key={s.label} style={{ borderBottom: `1px solid ${rule}` }}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className="social-row"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '20px 92px minmax(0,1fr) auto',
                      gap: 12,
                      alignItems: 'center',
                      minHeight: 48,
                      padding: '0 4px',
                      textDecoration: 'none',
                      color: 'var(--color-bg)',
                      fontSize: 14,
                    }}
                  >
                    <span style={{ display: 'flex', color: 'var(--color-accent-400)' }}>
                      <Icon name={s.icon} />
                    </span>
                    <span style={{ fontWeight: 800 }}>{s.label}</span>
                    <span style={{ color: muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {s.handle}
                    </span>
                    <span className="social-arrow" style={{ display: 'flex', color: 'var(--color-accent-400)' }}>
                      <Icon name="arrow-up-right" size={18} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={480} style={{ minWidth: 0 }}>
            <Terminal autoplay={autoplay} />
          </Reveal>
        </div>

      </div>
    </section>
  )
}
