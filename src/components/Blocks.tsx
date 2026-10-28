import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease, LineReveal, Reveal } from '../lib/motion'

/** Standard page gutter (80px at 1440). */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-5 md:px-10 xl:px-20 ${className}`}>{children}</div>
}

/** 60px section statement with a line-by-line reveal. */
export function Statement({ children, className = '' }: { children: string; className?: string }) {
  return (
    <h2 className={`max-w-[1034px] font-display text-display font-medium text-ink ${className}`}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        <LineReveal lines={[children]} />
      </span>
    </h2>
  )
}

/** Body copy column indented to x=412 at 1440. */
export function Indented({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`lg:ml-[332px] lg:max-w-[947px] ${className}`}>{children}</div>
}

export function BodyP({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <Reveal delay={delay}>
      <p className={`text-[18px] leading-[30px] font-light tracking-[-0.01em] md:text-[24px] md:leading-[40px] ${className}`}>{children}</p>
    </Reveal>
  )
}

/** Gray media placeholder from the design (video/hero still). Fades/scales in once when scrolled into view. */
export function MediaBox({
  className = '',
  tone = '#d9d9d9',
  play,
  label = 'Media placeholder',
}: {
  className?: string
  tone?: string
  play?: boolean
  label?: string
}) {
  return (
    <motion.div
      style={{ backgroundColor: tone }}
      className={`relative flex items-center justify-center ${className}`}
      role="img"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
    >
      {play && (
        <motion.button
          type="button"
          aria-label="Play video"
          className="group relative flex size-[80px] items-center justify-center md:size-[115px]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/assets/ui/play-circle.svg" alt="" width={115} height={115} className="absolute inset-0 size-full" />
          <span className="absolute inset-0 animate-ping rounded-full bg-lime/40 [animation-duration:2.4s]" />
          <img src="/assets/ui/play-icon.svg" alt="" width={20.67} height={26} className="relative ml-1 w-[15px] md:w-[20.67px]" />
        </motion.button>
      )}
    </motion.div>
  )
}

/** Lead paragraph (32px Plus Jakarta). */
export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal>
      <p className={`max-w-[906px] font-display text-[22px] leading-[32px] font-medium tracking-[-0.02em] text-[#494949] md:text-[32px] md:leading-[45px] ${className}`}>
        {children}
      </p>
    </Reveal>
  )
}

/** "The Challange" style row: 28px heading left, 20/38 copy from x=663. */
export function SplitText({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-[minmax(0,583fr)_minmax(0,711fr)] lg:gap-0">
      <Reveal>
        <h2 className="font-display text-[24px] font-medium md:text-[28px]">{title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-[711px] text-[17px] leading-[30px] font-light md:text-[20px] md:leading-[38px]">{children}</p>
      </Reveal>
    </div>
  )
}

export function TwoBoxes() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
      <MediaBox className="aspect-[620/407]" />
      <MediaBox className="aspect-[620/407]" />
    </div>
  )
}

export const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, ease } }
