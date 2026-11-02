import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ABOUT_FACTS, PRINCIPLES, STATEMENT } from '../data/portfolio'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { sectionStyle } from './sectionStyles'

const muted = 'color-mix(in srgb, var(--color-text) 70%, transparent)'
const WORDS = STATEMENT.split(' ')

function Word({ word, index, progress, still }: { word: string; index: number; progress: MotionValue<number>; still: boolean }) {
  const threshold = (index + 0.5) / WORDS.length
  const opacity = useTransform(progress, (p) => (still || threshold <= p ? 1 : 0.22))
  return (
    <motion.span style={{ opacity, transition: 'opacity .35s' }}>{word} </motion.span>
  )
}

export function AboutSection() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] })

  return (
    <section id="about" aria-labelledby="about-h" style={sectionStyle}>
      <SectionHeading num="01" label="About" headingId="about-h" />
      <p
        ref={ref}
        style={{
          margin: 'clamp(32px,4vw,56px) 0 0 -0.04em',
          fontSize: 'clamp(30px,4.6vw,64px)',
          lineHeight: 1.06,
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        {WORDS.map((w, i) => (
          <Word key={i} word={w} index={i} progress={scrollYProgress} still={reduced} />
        ))}
      </p>

      <div
        style={{
          marginTop: 'clamp(56px,7vw,96px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
          gap: 'clamp(40px,6vw,96px)',
        }}
      >
        <Reveal as="dl" style={{ margin: 0, borderTop: '2px solid var(--color-divider)' }}>
          {ABOUT_FACTS.map((f) => (
            <div
              key={f.k}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px minmax(0,1fr)',
                gap: 16,
                padding: '14px 0',
                borderBottom: '1px solid var(--color-divider)',
                fontSize: 15,
              }}
            >
              <dt style={{ color: muted }}>{f.k}</dt>
              <dd style={{ margin: 0, fontWeight: 600 }}>{f.v}</dd>
            </div>
          ))}
        </Reveal>
        <Reveal delay={120} style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 17, lineHeight: 1.6, maxWidth: '56ch' }}>
          <p style={{ margin: 0 }}>
            My focus is the frontend: turning product requirements into fast, responsive interfaces in React, Next.js,
            Vue and Nuxt — typed end to end with TypeScript, and extended to mobile with React Native and to the
            immersive web with Three.js and WebXR.
          </p>
          <p style={{ margin: 0 }}>
            Alongside building, I work as an IT mentor, helping developers learn to write the same kind of clean,
            maintainable code.
          </p>
          <p style={{ margin: 0 }}>
            I aspire to become a highly skilled Frontend Engineer, creating innovative digital experiences through
            clean code, modern technologies, and thoughtful design. My focus is on building scalable products and
            continuously growing as a developer.
          </p>
        </Reveal>
      </div>

      <div
        style={{
          marginTop: 'clamp(56px,7vw,96px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
          borderTop: '2px solid var(--color-divider)',
        }}
      >
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.n} delay={i * 100} style={{ padding: '20px 24px 32px 0', borderBottom: '1px solid var(--color-divider)' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-accent-700)', fontFeatureSettings: "'tnum' 1" }}>{p.n}</div>
            <h3 style={{ margin: '24px 0 10px', fontSize: 24, letterSpacing: '-0.015em' }}>{p.t}</h3>
            <p
              style={{
                margin: 0,
                fontSize: 15.5,
                lineHeight: 1.6,
                color: 'color-mix(in srgb, var(--color-text) 78%, transparent)',
                maxWidth: '34ch',
              }}
            >
              {p.c}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

