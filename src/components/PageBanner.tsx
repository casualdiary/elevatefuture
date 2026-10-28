import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../lib/motion'

type Props = {
  title: string
  /** lime "." after the title (index pages) */
  dot?: boolean
  /** 'xl' = 150px index titles, 'lg' = 80px detail titles */
  size?: 'xl' | 'lg'
  /** Figma line-height of the title box in em (xl default 1 = 150px; detail 80px titles 1.25 = 100px or 1.875 = 150px) */
  leading?: number
  intro: ReactNode
  introSize?: 'lg' | 'md' | 'sm'
  /** left column under the title (meta, filter chips) */
  aside?: ReactNode
  /** nudge the intro up when there's no aside (About) */
  introRaised?: boolean
}

const introCls = {
  lg: 'text-[22px] leading-[34px] text-[#494949] md:text-[28px] md:leading-[42px] xl:text-[32px] xl:leading-[48px] max-w-[717px]',
  md: 'text-[18px] leading-[30px] text-[#494949] md:text-[24px] md:leading-[38px] max-w-[717px]',
  sm: 'text-[16px] leading-[28px] md:text-[18px] md:leading-[30px] max-w-[631px]',
}

/** Cream page header shared by every inner page (793px tall at 1440). */
export function PageBanner({ title, dot, size = 'xl', leading, intro, introSize = 'lg', aside, introRaised }: Props) {
  const words = title.split(' ')
  const lh = leading ?? (size === 'xl' ? 1 : 1.25)
  return (
    <section className="bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-[132px] pb-16 md:px-10 md:pt-[180px] md:pb-20 lg:min-h-[793px] lg:pt-[252px] lg:pb-[38px]">
        <h1
          className={`font-display font-medium tracking-[-0.02em] text-ink ${
            size === 'xl'
              ? 'text-[length:clamp(3.25rem,1.2rem+9.1vw,9.375rem)] leading-[1] lg:mt-[calc((var(--lh)-1)*75px)]'
              : 'text-[length:clamp(2.5rem,1.6rem+3.8vw,5rem)] leading-[1.15] lg:leading-[var(--lh)]'
          }`}
          style={{ ['--lh' as string]: lh }}
        >
          <span className="sr-only">{title}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.25em] overflow-hidden pb-[0.12em] -mb-[0.12em]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.07 }}
              >
                {w}
                {dot && i === words.length - 1 && (
                  <motion.span
                    className="inline-block text-lime"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 14, delay: 0.55 + i * 0.07 }}
                  >
                    .
                  </motion.span>
                )}
              </motion.span>
            ))}
          </span>
        </h1>

        <div
          className={`mt-10 grid gap-y-10 lg:max-w-[1331px] lg:grid-cols-[minmax(0,614fr)_minmax(0,717fr)] ${
            size === 'xl' ? 'lg:mt-[calc(107px-(var(--lh)-1)*75px)]' : 'lg:mt-[calc(257px-var(--lh)*80px)]'
          }`}
          style={{ ['--lh' as string]: lh }}
        >
          <motion.div
            className="lg:pl-1.5 lg:pr-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
          >
            {aside}
          </motion.div>
          <motion.div
            className={`font-sans font-light ${introCls[introSize]} ${introRaised ? 'lg:-mt-2' : introSize === 'sm' ? 'lg:pt-9' : 'lg:pt-[29px]'}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
          >
            {intro}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Label + value pair used in the banner's left column. */
export function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[16px] text-[#7c7c7c]">{label}</p>
      <div className="mt-2.5 pl-px text-[14px] text-ink">{children}</div>
    </div>
  )
}

export function MetaStack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-7">{children}</div>
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-[20px] bg-white px-6 py-[3px] text-[14px] text-ink">{children}</span>
}
