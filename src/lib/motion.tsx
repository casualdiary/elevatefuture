import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

type RevealProps = HTMLMotionProps<'div'> & { children: ReactNode; delay?: number; amount?: number }

/** Fades + lifts its content in once when scrolled into view. */
export function Reveal({ children, delay = 0, amount = 0.25, ...rest }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Splits a heading into lines that slide up from a mask, one after another. */
export function LineReveal({ lines, className = '', delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={stagger(0.12, delay)}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
