import { useState } from 'react'
import { PROJECTS } from '../data/portfolio'
import { useNarrow } from '../hooks/useMediaQuery'
import { ProjectCard, ProjectImage, ProjectLinks, StackTags } from './ProjectCard'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { displayHeading, sectionStyle } from './sectionStyles'

const muted = 'color-mix(in srgb, var(--color-text) 70%, transparent)'
const pad = (n: number) => String(n).padStart(2, '0')

export function ProjectsSection() {
  const narrow = useNarrow()
  const [cur, setCur] = useState(0)
  const current = PROJECTS[cur]

  return (
    <section id="projects" aria-labelledby="projects-h" style={sectionStyle}>
      <SectionHeading num="03" label="Projects" meta={`${pad(PROJECTS.length)} selected`} />
      <Reveal as="div">
        <h2 id="projects-h" style={displayHeading}>
          Selected work.
        </h2>
      </Reveal>

      <div
        style={{
          marginTop: 'clamp(32px,4vw,56px)',
          display: 'grid',
          gridTemplateColumns: narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1.05fr)',
          gap: 'clamp(32px,5vw,72px)',
          alignItems: 'start',
        }}
      >
        <Reveal style={{ borderBottom: '2px solid var(--color-divider)', minWidth: 0 }}>
          {PROJECTS.map((p, i) => {
            const on = cur === i
            const hover = () => !narrow && setCur(i)
            return (
              <article key={p.name} style={{ borderTop: '2px solid var(--color-divider)' }}>
                <button
                  type="button"
                  onClick={() => setCur(i)}
                  onMouseEnter={hover}
                  onFocus={hover}
                  aria-expanded={on}
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '44px minmax(0,1fr) auto',
                    gap: '12px 16px',
                    alignItems: 'baseline',
                    padding: 'clamp(20px,2.4vw,30px) 0',
                    background: 'transparent',
                    border: 0,
                    color: 'inherit',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 800, fontFeatureSettings: "'tnum' 1", color: 'var(--color-accent-700)' }}>
                    {pad(i + 1)}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: 'clamp(26px,3.3vw,44px)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        color: on && !narrow ? 'var(--color-accent)' : 'var(--color-text)',
                        transition: 'color .25s',
                      }}
                    >
                      {p.name}
                    </span>
                    <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>{p.category}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 'clamp(34px,4.4vw,60px)',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: 'var(--color-accent)',
                      transform: on ? (narrow ? 'rotate(90deg)' : 'translateX(0)') : 'translateX(-10px)',
                      opacity: on ? 1 : 0.25,
                      transition: 'transform .35s cubic-bezier(.2,.7,.1,1), opacity .25s',
                    }}
                  >
                    →
                  </span>
                </button>
                {narrow && on && <ProjectCard project={p} />}
              </article>
            )
          })}
        </Reveal>

        {!narrow && (
          <Reveal delay={120} style={{ position: 'sticky', top: 96, minWidth: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', width: '100%', background: 'var(--color-surface)', borderRadius: 16, overflow: 'hidden' }}>
              {PROJECTS.map((p, i) => (
                <ProjectImage
                  key={p.name}
                  project={p}
                  active={cur === i}
                  style={{
                    gridArea: '1/1',
                    width: '100%',
                    minWidth: 0,
                    opacity: cur === i ? 1 : 0,
                    pointerEvents: cur === i ? 'auto' : 'none',
                    transition: 'opacity .45s ease',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                padding: '10px 0',
                borderBottom: '2px solid var(--color-divider)',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFeatureSettings: "'tnum' 1",
                color: muted,
              }}
            >
              <span>
                Fig. {pad(cur + 1)} — {current.name}
              </span>
              <span>{current.category}</span>
            </div>
            <p style={{ margin: '20px 0 0', fontSize: 17, lineHeight: 1.6, maxWidth: '52ch' }}>{current.description}</p>
            <StackTags stack={current.stack} style={{ marginTop: 18 }} />
            <ProjectLinks project={current} style={{ marginTop: 24 }} />
          </Reveal>
        )}
      </div>
    </section>
  )
}

