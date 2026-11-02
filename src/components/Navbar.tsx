import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { NAV, SOCIALS, type NavId } from '../data/portfolio'
import { useNarrow } from '../hooks/useMediaQuery'
import { Icon } from './Icon'

export function Navbar({ active }: { active: NavId }) {
  const narrow = useNarrow()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const menuOpen = open && narrow

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const close = () => setOpen(false)

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 60,
          background: 'var(--color-neutral-900)',
          color: 'var(--color-bg)',
          borderBottom: '2px solid var(--color-neutral-600)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(20px,5vw,64px)',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <a
            href="#home"
            onClick={close}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: 'var(--color-bg)',
              marginRight: 'auto',
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            <img
              src="/assets/logo-id.png"
              alt=""
              width={42}
              height={30}
              style={{ width: 42, height: 30, flex: 'none', objectFit: 'contain' }}
            />
            Mr Dilshodbek
          </a>

          {!narrow && (
            <>
              <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {NAV.map((n) => {
                  const on = active === n.id
                  return (
                    <a
                      key={n.id}
                      href={'#' + n.id}
                      aria-current={on ? 'location' : undefined}
                      className="nav-link"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        padding: '20px 10px 18px',
                        textDecoration: 'none',
                        fontSize: 14,
                        fontWeight: 600,
                        color: on ? 'var(--color-accent-400)' : 'var(--color-bg)',
                        borderBottom: `2px solid ${on ? 'var(--color-accent)' : 'transparent'}`,
                        marginBottom: -2,
                      }}
                    >
                      <span style={{ display: 'flex', opacity: 0.85 }}>
                        <Icon name={n.id === 'home' ? 'home' : n.id} size={16} />
                      </span>
                      {n.label}
                    </a>
                  )
                })}
              </nav>
              <a
                href="#contact"
                className="btn btn-primary"
                style={{ padding: '12px 16px', minHeight: 44, gap: 28, justifyContent: 'flex-start', whiteSpace: 'nowrap', flex: 'none' }}
              >
                Let's talk <span aria-hidden="true">→</span>
              </a>
            </>
          )}

          {narrow && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="btn btn-outline-on-accent"
              style={{ width: 44, height: 44, minHeight: 44, padding: 0 }}
            >
              <span aria-hidden="true" style={{ display: 'grid', gap: 4, width: 20 }}>
                <span
                  style={{
                    height: 2,
                    background: 'currentColor',
                    transition: 'transform .3s',
                    transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  style={{
                    height: 2,
                    background: 'currentColor',
                    transition: 'transform .3s',
                    transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none',
                  }}
                />
              </span>
            </button>
          )}
        </div>
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -2,
            height: 2,
            background: 'var(--color-accent)',
            scaleX: scrollYProgress,
            transformOrigin: 'left',
          }}
        />
      </header>

      {narrow && (
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          style={{
            position: 'fixed',
            top: 66,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 55,
            background: 'var(--color-text)',
            color: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px clamp(20px,5vw,64px) 32px',
            overflowY: 'auto',
            transform: menuOpen ? 'translateX(0)' : 'translateX(-104%)',
            visibility: menuOpen ? 'visible' : 'hidden',
            transition: `transform .55s cubic-bezier(.7,0,.2,1), visibility 0s linear ${menuOpen ? '0s' : '.55s'}`,
          }}
        >
          <nav aria-label="Mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={'#' + n.id}
                onClick={close}
                className="mobile-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: '1px solid var(--color-neutral-800)',
                  textDecoration: 'none',
                  color: 'var(--color-bg)',
                  fontSize: 'clamp(34px,10vw,52px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                }}
              >
                <span style={{ display: 'flex', color: 'var(--color-accent-400)' }}>
                  <Icon name={n.id} size={26} />
                </span>
                {n.label}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 32 }}>
            <a
              href="#contact"
              onClick={close}
              className="btn btn-primary"
              style={{ minHeight: 52, fontSize: 16, justifyContent: 'space-between', padding: '14px 18px' }}
            >
              Let's talk <span aria-hidden="true">→</span>
            </a>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', fontSize: 14 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="mobile-social"
                  style={{ textDecoration: 'none', padding: '6px 0' }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
