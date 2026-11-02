import type { CSSProperties } from 'react'
import type { Project } from '../data/portfolio'

interface ImageProps {
  project: Project
  style?: CSSProperties
  /** inactive previews (faded out in the stack) must not be reachable by keyboard or screen reader */
  active?: boolean
}

/** Full-colour screenshot; the live-demo button appears over it on hover/focus (always visible on touch). */
export function ProjectImage({ project, style, active = true }: ImageProps) {
  return (
    <figure
      className="project-media"
      style={{
        margin: 0,
        aspectRatio: '11 / 5', // the screenshots are ~2.2:1, so nothing is cropped at the sides
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        background: 'var(--color-surface)',
        ...style,
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0' }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            border: '1px dashed var(--color-accent-700)',
            color: 'var(--color-accent-700)',
            fontSize: 13,
            fontWeight: 600,
            textAlign: 'center',
            padding: 16,
          }}
        >
          [ Add screenshot — {project.name} ]
        </div>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener"
          className="project-overlay"
          aria-label={`View ${project.name} live demo`}
          tabIndex={active ? 0 : -1}
          aria-hidden={active ? undefined : true}
        >
          <span className="btn btn-primary" style={{ minHeight: 48, padding: '12px 18px', gap: 24, fontSize: 15 }}>
            View live demo <span aria-hidden="true">↗</span>
          </span>
        </a>
      )}
    </figure>
  )
}

export function StackTags({ stack, style }: { stack: string[]; style?: CSSProperties }) {
  if (stack.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, ...style }}>
      {stack.map((t) => (
        <span key={t} className="tag tag-neutral">
          {t}
        </span>
      ))}
    </div>
  )
}

/** Only the source link lives below the image; the demo link is on the image itself. */
export function ProjectLinks({ project, style }: { project: Project; style?: CSSProperties }) {
  if (!project.sourceUrl) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, ...style }}>
      <a href={project.sourceUrl} target="_blank" rel="noopener" className="btn btn-secondary" style={{ minHeight: 44, padding: '12px 16px', gap: 28 }}>
        Source <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

/** Detail block shown inline under the open project on mobile. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div style={{ padding: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <ProjectImage project={project} />
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, maxWidth: '52ch' }}>{project.description}</p>
      <StackTags stack={project.stack} />
      <ProjectLinks project={project} />
    </div>
  )
}
