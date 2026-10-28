import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ease, Reveal } from '../lib/motion'
import { PillButton } from './PillButton'

type Img = {
  src: string
  /** image box inside the 573×393 frame (px at 1440) */
  box: { left: number; top: number; width: number; height: number }
  bg?: string
  /** height (px) of a solid band over the top of the frame (HSBC artwork) */
  band?: number
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`

/** Cream "Next Project / Next Post / Next Service" band at the end of detail pages. */
export function NextUp({ label, title, to, img }: { label: string; title: string; to: string; img: Img }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[minmax(0,712fr)_minmax(0,573fr)] lg:items-start lg:gap-0 lg:pt-20 xl:px-20">
        <div className="lg:pt-10 lg:pr-10">
          <Reveal>
            <p className="font-display text-[22px] leading-[45px] text-[#494949] md:text-[30px]">{label}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              to={to}
              className="mt-2 block max-w-[638px] font-display text-[36px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#494949] transition-colors hover:text-ink md:mt-5 md:text-[60px] md:leading-[normal]"
            >
              {title}
            </Link>
          </Reveal>
          <Reveal delay={0.16} className="mt-8 md:mt-10">
            <PillButton to={to} variant="outline-sm">
              Show me more
            </PillButton>
          </Reveal>
        </div>
        <Link to={to} aria-label={title} className="group block">
          <motion.div
            className="relative aspect-[573/393] overflow-hidden rounded-lg"
            style={{ backgroundColor: img.bg }}
            initial={{ clipPath: 'inset(0 0 0 100% round 8px)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0% round 8px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease }}
          >
            <img
              src={img.src}
              alt=""
              loading="lazy"
              className="absolute max-w-none object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
              style={{ left: pct(img.box.left, 573), top: pct(img.box.top, 393), width: pct(img.box.width, 573), height: pct(img.box.height, 393) }}
            />
            {img.band && <div className="absolute inset-x-0 top-0" style={{ height: pct(img.band, 393), backgroundColor: img.bg }} />}
          </motion.div>
        </Link>
      </div>
    </section>
  )
}

export const nextImages = {
  hsbc: { src: '/assets/work-hsbc.png', bg: '#d2e4e6', band: 86, box: { left: -2.82, top: -117.07, width: 609.467, height: 861.661 } },
  pixar: { src: '/assets/news-3.png', box: { left: -125, top: -82, width: 1000, height: 584 } },
} satisfies Record<string, Img>
