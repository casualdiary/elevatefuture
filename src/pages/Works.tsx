import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Container } from '../components/Blocks'
import { FilterChips } from '../components/FilterChips'
import { PageBanner } from '../components/PageBanner'
import { WorkCard } from '../components/WorkCard'
import { useContent } from '../data/content'
import { ease, Reveal } from '../lib/motion'

const filters = ['All Works', 'Animation', 'Motion Graphics', 'Immersive Content'] as const

export default function Works() {
  const { works } = useContent()
  const [filter, setFilter] = useState<(typeof filters)[number]>('All Works')
  const [pages, setPages] = useState(1)
  const base = filter === 'All Works' ? works : works.filter((w) => w.category === filter)
  // "Show me more" appends another page of the (sample) catalogue.
  const list = Array.from({ length: pages }, () => base).flat()

  return (
    <>
      <PageBanner
        title="Works"
        dot
        introSize="sm"
        intro="With a decade of experience in the industry, we take pride in our journey so far. Over the years, we have successfully completed over 200 projects for over 100 clients, and have been recognised with more than 30 creative awards for our work."
        aside={<FilterChips id="works-filter" label="Project Type" options={filters} value={filter} onChange={(f) => { setFilter(f); setPages(1) }} />}
      />
      <Container className="pt-14 pb-20 md:pt-20 md:pb-[101px]">
        <motion.div layout className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-20 xl:gap-x-20">
          <AnimatePresence mode="popLayout">
            {list.map((w, i) => (
              <motion.div
                key={`${w.slug}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease }}
              >
                <WorkCard work={w} index={i} theme="light" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
