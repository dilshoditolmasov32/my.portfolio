import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { EMAIL, PROJECTS, SOCIALS } from '../data/portfolio'

type Kind = 'cmd' | 'out' | 'dim' | 'err'
interface Line {
  k: Kind
  t: string
}

const LINE_COLOR: Record<Kind, string> = {
  cmd: 'var(--color-neutral-100)',
  out: 'var(--color-neutral-300)',
  dim: 'var(--color-neutral-500)',
  err: 'var(--color-accent-400)',
}
const out = (t: string): Line => ({ k: 'out', t })
const dim = (t: string): Line => ({ k: 'dim', t })

const CHIPS = ['help', 'about', 'stack', 'projects', 'contact', 'clear']
const INTRO = ['whoami', 'stack --core', 'projects']

function outputFor(cmd: string): Line[] | 'clear' {
  const parts = cmd.toLowerCase().split(/\s+/)
  const base = parts[0]
  switch (base) {
    case 'help':
      return [
        out('about      who I am'),
        out('stack      technologies, by layer'),
        out('projects   selected work'),
        out('contact    ways to reach me'),
        out('socials    profiles'),
        out('clear      reset the screen'),
      ]
    case 'whoami':
      return [out('dilshodbek itolmasov'), dim('frontend developer & it mentor · tashkent, uz')]
    case 'about':
      return [
        out('Dilshodbek Itolmasov — Frontend Developer & IT Mentor'),
        out('Based in Tashkent, Uzbekistan.'),
        out('Builds modern, responsive web apps with React, Next.js, Vue & TypeScript.'),
      ]
    case 'stack':
      if (parts.includes('--core')) return [out('react · next.js · vue 3 · nuxt · typescript')]
      return [
        out('frontend   react next.js vue3 nuxt typescript tailwind'),
        out('mobile     react-native expo'),
        out('3d/xr      three.js webxr mindar'),
        out('data       tanstack-query axios zod formik'),
        out('backend    python django postgresql prisma'),
        out('tooling    git docker vite figma'),
      ]
    case 'projects':
    case 'ls':
      return [
        ...PROJECTS.map((p, i) =>
          out(`${String(i + 1).padStart(2, '0')}  ${p.name.toLowerCase().padEnd(18)}${p.category.toLowerCase()}`),
        ),
        dim('→ details in #projects below'),
      ]
    case 'contact':
      return [
        out('telegram   @dasturchi_dilshodbek'),
        out('email      ' + EMAIL),
        out('linkedin   in/dilshodbek-itolmasov'),
        dim('→ or scroll to #contact'),
      ]
    case 'socials':
      return SOCIALS.map((s) => out((s.label.toLowerCase() + '          ').slice(0, 11) + s.handle))
    case 'sudo':
      return [out('permission granted.'), dim('→ #contact — let’s talk')]
    case 'clear':
      return 'clear'
    default:
      return [{ k: 'err', t: `command not found: ${base} — try 'help'` }]
  }
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export function Terminal({ autoplay = true }: { autoplay?: boolean }) {
  const reduced = useReducedMotion() ?? false
  const [lines, setLines] = useState<Line[]>([dim("portfolio shell — type 'help' or tap a command")])
  const [typing, setTyping] = useState('')
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const tok = useRef(0) // bumping this cancels the running sequence

  const run = useCallback(
    async (raw: string, token: number, animate: boolean) => {
      const cmd = raw.trim()
      if (!cmd) return
      setBusy(true)
      setTyping('')
      if (animate && !reduced) {
        for (let i = 1; i <= cmd.length; i++) {
          if (tok.current !== token) return
          setTyping(cmd.slice(0, i))
          await sleep(40 + Math.random() * 55)
        }
        await sleep(200)
      }
      if (tok.current !== token) return
      const result = outputFor(cmd)
      if (result === 'clear') {
        setLines([])
        setTyping('')
        setBusy(false)
        return
      }
      setLines((l) => [...l, { k: 'cmd', t: cmd }])
      setTyping('')
      for (const line of result) {
        if (!reduced) await sleep(55)
        if (tok.current !== token) return
        setLines((l) => [...l, line])
      }
      setBusy(false)
    },
    [reduced],
  )

  const user = (cmd: string, animate: boolean) => {
    const token = ++tok.current
    void run(cmd, token, animate)
  }

  useEffect(() => {
    if (!autoplay) return
    const token = ++tok.current
    void (async () => {
      await sleep(reduced ? 0 : 1100)
      for (const c of INTRO) {
        if (tok.current !== token) return
        await run(c, token, true)
        if (!reduced) await sleep(600)
      }
    })()
    const counter = tok
    return () => {
      counter.current++
    }
  }, [autoplay, reduced, run])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, typing])

  const focusInput = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const v = input
    setInput('')
    user(v, false)
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0)
  }

  return (
    <div
      style={{
        background: 'var(--color-neutral-900)',
        border: '1px solid var(--color-neutral-700)',
        color: 'var(--color-neutral-200)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 16,
        overflow: 'hidden',
        fontFamily: "ui-monospace,'SF Mono',Menlo,Consolas,monospace",
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-neutral-800)',
          fontSize: 12,
          color: 'var(--color-neutral-500)',
        }}
      >
        <span style={{ width: 9, height: 9, background: 'var(--color-neutral-700)' }} />
        <span style={{ width: 9, height: 9, background: 'var(--color-neutral-700)' }} />
        <span style={{ width: 9, height: 9, background: 'var(--color-accent-500)' }} />
        <span style={{ marginLeft: 10, color: 'var(--color-neutral-400)' }}>~/dilshodbek — zsh</span>
        <span style={{ marginLeft: 'auto' }}>tty01</span>
      </div>

      <div
        ref={logRef}
        onClick={focusInput}
        role="log"
        aria-live="polite"
        aria-label="Interactive terminal"
        style={{
          height: 'clamp(300px,40vh,380px)',
          overflowY: 'auto',
          padding: '18px 16px',
          fontSize: 13.5,
          lineHeight: 1.7,
          cursor: 'text',
        }}
      >
        {lines.map((l, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: LINE_COLOR[l.k] }}>
            {l.k === 'cmd' && <span style={{ color: 'var(--color-accent-500)' }}>~ $ </span>}
            {l.t}
          </div>
        ))}
        {busy ? (
          <div style={{ whiteSpace: 'pre-wrap', color: 'var(--color-neutral-100)' }}>
            <span style={{ color: 'var(--color-accent-500)' }}>~ $ </span>
            {typing}
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '0.55em',
                height: '1.15em',
                verticalAlign: '-0.22em',
                marginLeft: 2,
                background: 'var(--color-accent-500)',
                animation: reduced ? 'none' : 'caret 1s steps(1) infinite',
              }}
            />
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
            <label htmlFor="term-in" style={{ color: 'var(--color-accent-500)', whiteSpace: 'pre' }}>
              {'~ $ '}
            </label>
            <input
              id="term-in"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              placeholder="type help"
              aria-label="Terminal command"
              style={{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                border: 0,
                outline: 'none',
                padding: 0,
                color: 'var(--color-neutral-100)',
                font: 'inherit',
                caretColor: 'var(--color-accent-500)',
              }}
            />
          </form>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          padding: '12px 16px 14px',
          borderTop: '1px solid var(--color-neutral-800)',
        }}
      >
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => user(c, true)}
            className="chip"
            style={{
              font: 'inherit',
              fontSize: 12,
              background: 'transparent',
              color: 'var(--color-neutral-300)',
              border: '1px solid var(--color-neutral-700)',
              padding: '8px 12px',
              minHeight: 36,
              cursor: 'pointer',
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

