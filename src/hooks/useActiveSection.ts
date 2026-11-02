import { useEffect, useState } from 'react'
import { SECTION_IDS, type NavId } from '../data/portfolio'

/** The last section whose top has crossed 35% of the viewport; "journey" counts as "projects" in the nav. */
export function useActiveSection(): NavId {
  const [active, setActive] = useState<NavId>('home')

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      let current: string = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id
      }
      setActive((current === 'journey' ? 'projects' : current) as NavId)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return active
}
