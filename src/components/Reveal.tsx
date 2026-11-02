import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'

const TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  li: motion.li,
  ul: motion.ul,
  dl: motion.dl,
  figure: motion.figure,
} as const

interface RevealProps {
  as?: keyof typeof TAGS
  /** delay in ms */
  delay?: number
  style?: CSSProperties
  className?: string
  ariaHidden?: boolean
  ariaLabel?: string
  children?: ReactNode
}

/** Fade + rise into view once. */
export function Reveal({ as = 'div', delay = 0, style, className, ariaHidden, ariaLabel, children }: RevealProps) {
  const Comp = TAGS[as] as typeof motion.div
  return (
    <Comp
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.9, delay: delay / 1000, ease: [0.2, 0.7, 0.1, 1] }}
      style={style}
      className={className}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    >
      {children}
    </Comp>
  )
}
