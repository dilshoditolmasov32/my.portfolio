import { useMemo } from 'react'
import { CORE, SKILLS } from '../data/portfolio'
import { Reveal } from './Reveal'
import { TechIcon } from './TechIcon'
import { SectionHeading } from './SectionHeading'
import { displayHeading, sectionStyle } from './sectionStyles'

const muted = 'color-mix(in srgb, var(--color-text) 70%, transparent)'

export function SkillsSection() {
  const cells = useMemo(() => {
    let idx = 0
    return SKILLS.flatMap((g) =>
      g.items.map((name) => {
        idx++
        return { name, code: `${g.code}·${String(idx).padStart(2, '0')}`, core: CORE.includes(name) }
      }),
    )
  }, [])

  return (
    <section id="skills" aria-labelledby="skills-h" style={sectionStyle}>
      <SectionHeading num="02" label="Skills" meta={`${cells.length} technologies`} />
      <Reveal as="div">
        <h2 id="skills-h" style={displayHeading}>
          The stack, by layer.
        </h2>
      </Reveal>

      <Reveal
        as="ul"
        ariaLabel="Technologies"
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 'clamp(28px,3vw,40px) 0 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(min(50%,168px),1fr))',
          borderTop: '1px solid var(--color-neutral-400)',
          borderLeft: '1px solid var(--color-neutral-400)',
        }}
      >
        {cells.map((c) => (
          <li
            key={c.name}
            className="skill-cell"
            style={{
              position: 'relative',
              minHeight: 132,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              borderRight: '1px solid var(--color-neutral-400)',
              borderBottom: '1px solid var(--color-neutral-400)',
              transition: 'background .2s, color .2s',
              cursor: 'default',
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFeatureSettings: "'tnum' 1", opacity: 0.75 }}>
              {c.code}
            </span>
            {c.core && (
              <span
                aria-label="core"
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 8,
                  height: 8,
                  background: 'var(--color-accent)',
                  outline: '1px solid var(--color-bg)',
                }}
              />
            )}
            <span style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TechIcon name={c.name} />
              <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{c.name}</span>
            </span>
          </li>
        ))}
      </Reveal>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, fontSize: 13, color: muted }}>
        <span style={{ width: 8, height: 8, background: 'var(--color-accent)' }} />
        Core daily stack
      </div>
    </section>
  )
}
