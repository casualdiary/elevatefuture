import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HeroCarousel } from './HeroCarousel'
import { introDelay } from '../lib/intro'
import { ease } from '../lib/motion'
import { PillButton } from './PillButton'

// Two hero modes: the cabin photo (Homepage frame) and the campaign carousel
// (Change BG / Change BG 2 / Banner Alternative frames). Thumbnails switch between them.
const slides = [
  { id: 'sneaker', thumb: '/assets/hero-thumb-sneaker.png', label: 'Show campaign carousel' },
  { id: 'cabin', thumb: '/assets/hero-cabin.png', label: 'Show cabin feature' },
] as const


export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [params] = useSearchParams()
  const [active, setActive] = useState<(typeof slides)[number]['id']>(params.get('hero') === 'carousel' ? 'sneaker' : 'cabin')
  const initialSlide = Number(params.get('slide') ?? 0) || 0
  const INTRO = introDelay()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex h-[max(100svh,640px)] flex-col justify-end overflow-hidden md:h-[clamp(720px,70.8333vw,1020px)]"
    >
      <motion.div className={`absolute inset-0 ${active === 'cabin' ? '-z-10' : 'z-0'}`} style={{ y: active === 'cabin' ? y : 0 }}>
        <AnimatePresence initial={false} mode="sync">
          {active === 'cabin' ? (
            <motion.img
              key="cabin"
              src="/assets/hero-cabin.png"
              alt="Timber-clad cabin in front of a mountain range"
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1.6, ease, delay: 0 } }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
            />
          ) : (
            <motion.div
              key="sneaker"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
            >
              <HeroCarousel initial={initialSlide} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {active === 'cabin' && <div className="pointer-events-none absolute inset-0 -z-10 bg-black/10" />}

      <div className="relative z-10 flex flex-col gap-5 px-5 pb-6 md:px-10 md:pb-[63px] lg:static lg:block lg:p-0">
        {/* Feature card */}
        <AnimatePresence>
        {active === 'cabin' && (
        <motion.article
          key="card"
          exit={{ opacity: 0, x: 60, transition: { duration: 0.4 } }}
          className="w-full max-w-[385px] rounded-lg bg-white p-[30px] shadow-[0_20px_60px_-30px_rgba(25,34,38,0.35)] md:ml-auto lg:absolute lg:top-[33.14%] lg:right-10 lg:z-10"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: INTRO + 0.25 }}
        >
          <h1 className="font-display text-[28px] leading-normal font-semibold tracking-[-0.02em] md:text-[32px]">
            Immersive Content
          </h1>
          <p className="mt-3 text-[16px] leading-[26px] font-light tracking-[-0.01em] md:mt-[22px] md:text-[18px] md:leading-[28px]">
            Immersive content in media marketing refers to the creation of engaging and interactive experiences that
            captivate audiences on a deeper level.
          </p>
          <PillButton to="/works/lazada" className="mt-6 md:mt-[30px] md:ml-2">
            View More
          </PillButton>
        </motion.article>
        )}
        </AnimatePresence>

        {/* Slide thumbnails */}
        <motion.div
          className="order-first flex gap-4 lg:absolute lg:bottom-[63px] lg:left-[53px] lg:z-10"
          role="tablist"
          aria-label="Featured work"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: INTRO + 0.45 }}
        >
          {slides.map((s) => {
            const isActive = active === s.id
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={s.label}
                onClick={() => setActive(s.id)}
                className={`relative size-[60px] overflow-hidden rounded-[6px] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 active:scale-95 ${
                  isActive ? 'rounded-lg ring-1 ring-white' : 'bg-[#eeede2]'
                }`}
              >
                <img src={s.thumb} alt="" className="size-full object-cover" />
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
