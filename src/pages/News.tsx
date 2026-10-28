import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Container } from '../components/Blocks'
import { FilterChips } from '../components/FilterChips'
import { NewsCard } from '../components/NewsCard'
import { PageBanner } from '../components/PageBanner'
import { useContent } from '../data/content'
import { Reveal } from '../lib/motion'

const filters = ['All News', 'Insights', 'Journal', 'Awards'] as const

export default function NewsPage() {
  const { news } = useContent()
  const [filter, setFilter] = useState<(typeof filters)[number]>('All News')
  const [pages, setPages] = useState(1)
  const base = filter === 'All News' ? news : news.filter((n) => n.category === filter)
  const list = Array.from({ length: pages }, () => base).flat()
  return (
    <>
      <PageBanner
        title="News"
        dot
        intro="We post updates from the studio, including articles about our team and inspirational work from the motion industry."
        aside={<FilterChips id="news-filter" label="Filter" options={filters} value={filter} onChange={(f) => { setFilter(f); setPages(1) }} />}
      />
      <Container className="pt-14 pb-20 md:pt-24 md:pb-[120px]">
        <motion.ul
          layout
          className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20 xl:gap-x-20"
        >
          <AnimatePresence mode="popLayout">
            {list.map((n, i) => (
              <NewsCard key={`${n.slug}-${i}`} item={n} variant="grid" index={i} />
            ))}
          </AnimatePresence>
        </motion.ul>
        <Reveal className="mt-16 flex justify-center md:mt-[120px]">
          <button
            type="button"
            onClick={() => setPages((p) => Math.min(p + 1, 3))}
            disabled={pages >= 3}
            className="inline-flex min-w-[239px] items-center justify-center rounded-full border border-ink px-8 py-5 font-display text-[20px] leading-none font-medium text-ink transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-paper active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
          >
            Show me more
          </button>
        </Reveal>
      </Container>
    </>
  )
}
