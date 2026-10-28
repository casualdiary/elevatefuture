import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ease } from '../lib/motion'

/**
 * Homepage banner in carousel mode — the Figma frames "Homepage - Change BG", "Change BG 2"
 * and "Banner Alternative" are three states of this one component.
 * Card is 623×494 at 1440; strips 91px wide with 20px gaps, staggered ±20px vertically.
 */
export const heroSlides = [
  {
    title: 'Yeezy season 2',
    meta: 'Experiental marketing and key visual',
    year: '2022',
    page: '#f2f1e8', // rgba(238,237,226,.76) over #fdfcfc
    card: '#eeede2',
    overlay: ['rgba(238,237,226,0.8)'],
    img: '/assets/hero-thumb-sneaker.png',
    // image box inside the 623×494 card (px)
    box: { left: 106, top: 110, width: 411, height: 274 },
    alt: 'Grey knit sneaker',
    wave: 2, // strips stagger ±40px in "Change BG", ±20px in the other two frames
  },
  {
    title: 'Adidas new predator',
    meta: 'Experiental marketing and key visual',
    year: '2024',
    page: '#c3c5ad',
    card: '#c3c5ad',
    overlay: ['rgba(195,197,173,0.9)'],
    img: '/assets/carousel/slide-adidas.jpg',
    box: { left: -123, top: -18, width: 901, height: 516 },
    alt: 'Footballer in an Adidas Predator campaign shot',
    wave: 1,
  },
  {
    title: 'Launched new BMW X1',
    meta: 'Experiental marketing and key visual',
    year: '2024',
    page: '#fdfcfc',
    card: '#f8f8f8',
    overlay: ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.95)'],
    img: '/assets/carousel/slide-bmw.jpg',
    box: { left: -272, top: -76, width: 931, height: 613 },
    alt: 'BMW X1 on a studio set',
    wave: 1,
  },
] as const

const leftStrips = [
  '/assets/carousel/strip-zenbook.png',
  '/assets/carousel/strip-lazada.jpg',
  '/assets/carousel/strip-bmw-x1.jpg',
  '/assets/carousel/strip-martell.jpg',
]
const rightStatic = ['/assets/hero-cabin.png', '/assets/carousel/strip-f1.png', '/assets/carousel/strip-character.jpg']
// vertical offsets (px at 1440) from the card top, outermost-left → outermost-right
const leftY = [-20, 20, 0, -20]
const rightY = [20, 0, -20, 20]

const pct = (v: number, of: number) => `${(v / of) * 100}%`
const AUTO_MS = 5500

export function HeroCarousel({ initial = 0, children }: { initial?: number; children?: React.ReactNode }) {
  const [index, setIndex] = useState(initial % heroSlides.length)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const slide = heroSlides[index]
  const next = heroSlides[(index + 1) % heroSlides.length]

  const go = useCallback((d: 1 | -1) => {
    setDir(d)
    setIndex((i) => (i + d + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (paused || reduce) return
    const t = setTimeout(() => go(1), AUTO_MS)
    return () => clearTimeout(t)
  }, [index, paused, reduce, go])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  const rights = [next.img, ...rightStatic]

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden pb-16 md:justify-start md:pt-[clamp(120px,18.4vw,265px)] md:pb-0"
      animate={{ backgroundColor: slide.page }}
      transition={{ duration: 0.9, ease }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured campaigns"
      tabIndex={0}
      style={{ ['--c' as string]: 'min(623px, max(43.27vw, min(78vw, 420px)))' } as CSSProperties}
    >
      <div className="flex items-start gap-[calc(var(--c)*20/623)]">
        {leftStrips.map((src, i) => (
          <Strip
            key={`l${i}`}
            src={src}
            y={leftY[i] * slide.wave}
            overlay={slide.overlay[i % slide.overlay.length]}
            delay={(3 - i) * 0.05}
            index={index}
            onClick={i === 3 ? () => go(-1) : undefined}
            label={i === 3 ? 'Previous slide' : undefined}
          />
        ))}

        {/* Main card */}
        <motion.div
          className="relative shrink-0 cursor-grab overflow-hidden rounded-[6px] active:cursor-grabbing"
          style={{ width: 'var(--c)', aspectRatio: '623/494' }}
          animate={{ backgroundColor: slide.card }}
          transition={{ duration: 0.9, ease }}
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.img
              key={slide.img}
              src={slide.img}
              alt={slide.alt}
              draggable={false}
              className="pointer-events-none absolute max-w-none object-cover"
              style={{ left: pct(slide.box.left, 623), top: pct(slide.box.top, 494), width: pct(slide.box.width, 623), height: pct(slide.box.height, 494) }}
              custom={dir}
              variants={{
                enter: (d: number) => ({ clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', scale: 1.12 }),
                center: { clipPath: 'inset(0 0% 0 0%)', scale: 1 },
                exit: { opacity: 0.6 },
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1, ease }}
            />
          </AnimatePresence>
          <Link
            to="/works/lazada"
            aria-label={`View ${slide.title}`}
            className="group absolute top-[58.1%] left-[74.4%] w-[18.46%]"
          >
            <motion.img
              src="/assets/cta-cursor-lg.svg"
              alt=""
              width={115}
              height={115}
              className="w-full transition-transform duration-500 group-hover:rotate-45"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 }}
            />
          </Link>
        </motion.div>

        {rights.map((src, i) => (
          <Strip
            key={`r${i}`}
            src={src}
            y={rightY[i] * slide.wave}
            overlay={slide.overlay[(i + 1) % slide.overlay.length]}
            delay={i * 0.05}
            index={index}
            onClick={i === 0 ? () => go(1) : undefined}
            label={i === 0 ? `Next slide: ${next.title}` : undefined}
          />
        ))}
      </div>

      {/* Caption */}
      <div className="relative mt-[calc(var(--c)*41/623)] overflow-hidden" style={{ width: 'var(--c)' }} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="pl-1 font-display text-[22px] font-medium tracking-[-0.01em] whitespace-pre md:text-[34px]">{slide.title}</p>
            <p className="mt-1.5 flex justify-between pr-[3px] pl-1 text-[14px] font-light tracking-[-0.01em] text-[#3d4244] md:mt-[15px] md:text-[18px]">
              <span>{slide.meta}</span>
              <span>{slide.year}</span>
            </p>
          </motion.div>
        </AnimatePresence>
        {/* Progress dots */}
        <div className="mt-4 flex gap-2 md:mt-6" role="tablist" aria-label="Choose slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.title}
              onClick={() => {
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              className="relative h-1 w-8 overflow-hidden rounded-full bg-ink/15"
            >
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute inset-0 origin-left bg-ink"
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: paused || reduce ? 0 : AUTO_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {children}
    </motion.div>
  )
}

function Strip({
  src,
  y,
  overlay,
  delay,
  index,
  onClick,
  label,
}: {
  src: string
  y: number
  overlay: string
  delay: number
  index: number
  onClick?: () => void
  label?: string
}) {
  const Tag = onClick ? motion.button : motion.div
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      aria-label={label}
      aria-hidden={onClick ? undefined : true}
      className={`relative shrink-0 overflow-hidden rounded-[6px] ${onClick ? 'cursor-pointer' : ''}`}
      style={{ width: 'calc(var(--c) * 91 / 623)', aspectRatio: '91/494' }}
      initial={false}
      animate={{ y: `calc(var(--c) * ${y} / 623)` }}
      whileHover={onClick ? { scale: 1.04 } : undefined}
      transition={{ duration: 0.8, ease, delay }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={`${src}-${index}`}
          src={src}
          alt=""
          className="absolute inset-0 size-full object-cover"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.8, ease, delay }}
        />
      </AnimatePresence>
      <motion.span className="absolute inset-0" animate={{ backgroundColor: overlay }} transition={{ duration: 0.9, ease }} />
    </Tag>
  )
}
