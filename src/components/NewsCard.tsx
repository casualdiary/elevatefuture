import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { NewsItem } from '../data/site'
import { ease } from '../lib/motion'

type Variant = 'carousel' | 'grid'

// Figma crop of each photo inside its rounded frame: frame size, image size and offset (px).
const frames = {
  carousel: { w: 541, h: 383, iw: 750, ih: 518 },
  grid: { w: 600, h: 440, iw: 831.792, ih: 595.091 },
} as const
const offsets: Record<Variant, Record<string, [number, number]>> = {
  carousel: {
    'thrive-in-a-post-pandemic-creative-industry': [-147, -71],
    'metaverse-is-still-a-thing': [-107, -121],
    'animation-vs-live-action': [-77, -71],
  },
  grid: {
    'metaverse-is-still-a-thing': [-118.67, -139.01],
    'animation-vs-live-action': [-85.4, -81.56],
    'thrive-in-a-post-pandemic-creative-industry': [-163.03, -81.56],
  },
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`

/** `index` makes the card animate on its own (grid inside AnimatePresence) instead of via parent variants. */
export function NewsCard({ item, variant = 'carousel', className = '', index }: { item: NewsItem; variant?: Variant; className?: string; index?: number }) {
  const f = frames[variant]
  const [x, y] = offsets[variant][item.slug] ?? [0, 0]
  return (
    <motion.li
      layout
      className={className}
      variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: index !== undefined ? 0.2 + (index % 4) * 0.1 : 0 } } }}
      {...(index !== undefined ? { initial: 'hidden', animate: 'show' } : {})}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
    >
      <Link to={`/news/${item.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: `${f.w}/${f.h}` }}>
          <img
            src={item.img}
            alt={item.alt}
            loading="lazy"
            className="absolute max-w-none object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
            style={{ left: pct(x, f.w), top: pct(y, f.h), width: pct(f.iw, f.w), height: pct(f.ih, f.h) }}
          />
        </div>
        <div className={variant === 'grid' ? 'md:px-[22px]' : 'md:px-5'}>
          <h3 className="mt-6 font-display text-[22px] font-medium md:mt-[30px] md:text-[24px]">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {item.title}
            </span>
          </h3>
          <p className={`mt-4 text-[16px] leading-[26px] font-light md:text-[18px] md:leading-[28px] ${variant === 'grid' ? 'max-w-[537px]' : 'max-w-[484px]'}`}>
            {item.body}
          </p>
        </div>
      </Link>
    </motion.li>
  )
}
