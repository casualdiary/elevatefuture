import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useContent } from '../data/content'
import { Reveal, stagger } from '../lib/motion'
import { NewsCard } from './NewsCard'
import { PillButton } from './PillButton'

const homeOrder = ['thrive-in-a-post-pandemic-creative-industry', 'metaverse-is-still-a-thing', 'animation-vs-live-action']

export function News() {
  const track = useRef<HTMLUListElement>(null)
  const scrollBy = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 541) + 40), behavior: 'smooth' })
  }
  const { news, status } = useContent()
  // Design order first, then anything newer added in the CMS.
  const items = [...homeOrder.map((s) => news.find((n) => n.slug === s)).filter((n) => n !== undefined), ...news.filter((n) => !homeOrder.includes(n.slug))]

  return (
    <section id="news" aria-busy={status === 'loading'} className="bg-paper pt-20 pb-24 md:pt-[100px] md:pb-[120px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between px-5 md:px-10 xl:px-20">
          <Reveal>
            <h2 className="font-display text-[28px] font-medium tracking-[-0.02em] md:text-[32px]">Recent News</h2>
          </Reveal>
          {/* Single Figma arrow asset (rotated −135°) renders ← →; two hit areas sit over its halves. */}
          <div className="relative flex size-[64px] items-center justify-center md:size-[81.142px]">
            <img src="/assets/arrows.svg" alt="" width={57.983} height={56.7696} className="pointer-events-none -rotate-135 scale-[0.8] md:scale-100" />
            <button type="button" aria-label="Previous news" onClick={() => scrollBy(-1)} className="absolute inset-y-0 left-0 w-1/2 rounded-l-full transition-colors hover:bg-ink/5 active:bg-ink/10" />
            <button type="button" aria-label="Next news" onClick={() => scrollBy(1)} className="absolute inset-y-0 right-0 w-1/2 rounded-r-full transition-colors hover:bg-ink/5 active:bg-ink/10" />
          </div>
        </div>

        <motion.ul
          ref={track}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory scroll-px-5 gap-10 overflow-x-auto px-5 md:mt-[39px] md:scroll-px-10 md:px-10 xl:scroll-px-[75px] xl:px-[75px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.12)}
        >
          {items.map((n) => (
            <NewsCard key={n.slug} item={n} className="w-[min(541px,85vw)] shrink-0 snap-start" />
          ))}
        </motion.ul>

        <Reveal className="mt-12 flex justify-center md:mt-[91px]">
          <PillButton to="/news" variant="outline-dark" className="min-w-[239px]">
            See all news
          </PillButton>
        </Reveal>
      </div>
    </section>
  )
}
