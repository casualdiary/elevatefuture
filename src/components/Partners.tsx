import { motion } from 'framer-motion'
import { useContent } from '../data/content'
import { ease, LineReveal, Reveal, stagger } from '../lib/motion'

export function ClientsGrid({ repeat = 1 }: { repeat?: number }) {
  const { clients } = useContent()
  const list = Array.from({ length: repeat }, () => clients).flat()
  return (
    <motion.ul
      className="grid max-w-[1236px] grid-cols-1 gap-x-[110px] gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[clamp(40px,7.6vw,110px)] lg:gap-y-[60px]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger(0.06)}
    >
      {list.map((c, i) => (
        <motion.li
          key={`${c.name}-${i}`}
          className="group"
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
        >
          <div className="flex h-[47px] items-start" style={{ paddingLeft: c.logoOffset }}>
            <img
              src={c.logo}
              alt={c.name}
              width={c.w}
              height={c.h}
              className="origin-left transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
            />
          </div>
          <p
            className="mt-[3px] max-w-[335px] font-display text-[16px] leading-[24px] tracking-[-0.02em] text-body"
            style={{ paddingLeft: c.textOffset }}
          >
            {c.text}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  )
}

/** Horizontal testimonial scroller that bleeds off the right edge like the design. */
export function Testimonials() {
  const { quote, testimonials } = useContent()
  return (
    <motion.ul
      className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-[30px] overflow-x-auto px-5 pb-2 md:scroll-px-10 md:px-10 xl:scroll-px-20 xl:px-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger(0.1)}
      aria-label="Testimonials"
    >
      {testimonials.map((t) => (
        <motion.li
          key={t.name}
          className="flex min-h-[213px] w-[min(449px,85vw)] shrink-0 snap-start gap-5 rounded-lg bg-white p-[30px] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(25,34,38,0.35)]"
          variants={{ hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
        >
          <div className="relative size-[50px] shrink-0 overflow-hidden rounded-full">
            <img
              src={t.avatar}
              alt={t.name}
              className="absolute max-w-none object-cover"
              style={{ left: t.box.left, top: t.box.top, width: t.box.width, height: t.box.height }}
            />
          </div>
          <figure className="flex flex-col">
            <blockquote className="max-w-[319px] font-serif text-[17px] leading-[28px] italic md:text-[18px]">{quote}</blockquote>
            <figcaption className="mt-auto pt-6 text-[16px] leading-[28px] font-medium">{t.name}</figcaption>
          </figure>
        </motion.li>
      ))}
    </motion.ul>
  )
}

type PartnersProps = {
  /** desktop line breaks of the heading */
  lines?: string[]
  repeat?: number
  id?: string
  gridGap?: string
}

export function Partners({
  lines = ['Since 2020, +30 brands trust our', 'branding agency.'],
  repeat = 1,
  id = 'about',
  gridGap = 'md:mt-[95px]',
}: PartnersProps) {
  const full = lines.join(' ')
  return (
    <section id={id} className="relative isolate overflow-hidden bg-cream">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-5"
        style={{ backgroundImage: 'url(/assets/partners-pattern.png)', backgroundSize: '245px 245px' }}
      />
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-8 md:px-10 md:pt-[100px] md:pb-10 xl:px-20">
        <h2 className="max-w-[1034px] font-display text-display font-medium">
          <span className="sr-only">{full}</span>
          <span aria-hidden className="hidden xl:block">
            <LineReveal lines={lines} />
          </span>
          <span aria-hidden className="xl:hidden">
            <LineReveal lines={[full]} />
          </span>
        </h2>

        <div className={`mt-12 ${gridGap}`}>
          <ClientsGrid repeat={repeat} />
        </div>

        <Reveal className="mt-16 md:mt-[98px]">
          <h3 className="pl-[5px] font-display text-[28px] font-medium tracking-[-0.02em] md:text-[32px]">What they are saying</h3>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1440px] pb-20 md:pb-[100px]">
        <Testimonials />
      </div>
    </section>
  )
}
