import { EDUCATION, EXPERIENCE, type Milestone } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { displayHeading, sectionStyle } from './sectionStyles'

const muted = 'color-mix(in srgb, var(--color-text) 70%, transparent)'

function Group({ title, items }: { title: string; items: Milestone[] }) {
  return (
    <div style={{ marginTop: 'clamp(40px,5vw,72px)' }}>
      <Reveal as="div">
        <h3
          style={{

          margin: '0 0 16px',
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent-700)',
          }}
        >
          {title}
        </h3>
      </Reveal>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, borderBottom: '2px solid var(--color-divider)' }}>
        {items.map((m, i) => (
          <Reveal
            as="li"
            key={m.org + m.period}
            delay={i * 100}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
              gap: '12px 40px',
              padding: '28px 0',
              borderTop: '2px solid var(--color-divider)',
              alignItems: 'baseline',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, fontFeatureSettings: "'tnum' 1", color: 'var(--color-accent-700)' }}>
              {m.period}
            </span>
            <span style={{ fontSize: 'clamp(20px,2vw,26px)', fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
              {m.org}
            </span>
            <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5, color: muted }}>{m.position}</span>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-h"
      style={{ ...sectionStyle, padding: 'clamp(80px,11vw,152px) clamp(20px,5vw,64px)' }}
    >
      <SectionHeading num="04" label="Journey" />
      <Reveal as="div">
        <h2 id="journey-h" style={displayHeading}>
          Experience &amp; education.
        </h2>
      </Reveal>
      <Group title="Professional experience" items={EXPERIENCE} />
      <Group title="Education" items={EDUCATION} />
    </section>
  )
}
