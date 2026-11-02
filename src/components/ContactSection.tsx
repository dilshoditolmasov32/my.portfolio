import { CONTACTS, SOCIALS } from '../data/portfolio'
import { Reveal } from './Reveal'

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-h" style={{ scrollMarginTop: 'calc(66px + 24px - clamp(80px,11vw,152px))', background: 'var(--color-accent)', color: 'var(--color-bg)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(80px,11vw,152px) clamp(20px,5vw,64px)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            paddingTop: 16,
            borderTop: '2px solid var(--color-bg)',
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontFeatureSettings: "'tnum' 1",
          }}
        >
          <span style={{ width: 10, height: 10, background: 'var(--color-bg)', flex: 'none' }} />
          <span>05</span>
          <span>Contact</span>
        </div>
        <h2
          id="contact-h"
          style={{
            margin: 'clamp(40px,5vw,72px) 0 0 -0.05em',
            fontSize: 'clamp(46px,9vw,136px)',
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
          }}
        >
          <Reveal as="span" style={{ display: 'block' }}>
            Have an idea?
          </Reveal>
          <Reveal as="span" delay={120} style={{ display: 'block' }}>
            Let's build it.
          </Reveal>
        </h2>

        <div
          style={{
            marginTop: 'clamp(40px,5vw,64px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: '40px clamp(40px,6vw,96px)',
            alignItems: 'start',
          }}
        >
          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p style={{ margin: 0, fontSize: 21, fontWeight: 800, lineHeight: 1.4, maxWidth: '30ch' }}>
              Open to freelance projects, collaboration, job opportunities and technical discussions.
            </p>
            <a
              href={SOCIALS[3].href}
              target="_blank"
              rel="noopener"
              className="contact-cta"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 48,
                minHeight: 60,
                padding: '16px 20px',
                background: 'var(--color-bg)',
                color: 'var(--color-accent-700)',
                fontSize: 19,
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              Message on Telegram <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal as="ul" delay={120} ariaLabel="Contact channels" style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '2px solid var(--color-bg)' }}>
            {CONTACTS.map((c) => (
              <li
                key={c.label}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '8px 20px',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-accent-300)',
                  fontSize: 19,
                  fontWeight: 800,
                }}
              >
                <span style={{ width: 96, flex: 'none' }}>{c.label}</span>
                <a
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener"
                  className="contact-link"
                  style={{ flex: 1, minWidth: 'min(100%,220px)', color: 'var(--color-bg)', textDecoration: 'none', overflowWrap: 'break-word' }}
                >
                  {c.value} ↗
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
