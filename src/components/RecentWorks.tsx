import { motion } from 'framer-motion'
import { useContent } from '../data/content'
import { ease, Reveal } from '../lib/motion'
import { PillButton } from './PillButton'
import { WorkCard } from './WorkCard'

/** Dark "Recent Works" band — homepage and the "Related Works" band on service detail. */
export function RecentWorks({ title = 'Recent Works', id = 'works' }: { title?: string; id?: string }) {
  const { works, status } = useContent()
  return (
    <section id={id} aria-busy={status === 'loading'} className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-24 md:px-10 md:pt-[120px] md:pb-[100px] xl:px-20">
        <motion.h2
          className="font-display text-[28px] font-medium tracking-[-0.02em] text-paper md:text-[32px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {title}
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 md:mt-[60px] md:grid-cols-2 md:gap-y-20 xl:gap-x-20">
          {works.slice(0, 4).map((w, i) => (
            <WorkCard key={w.slug} work={w} index={i} />
          ))}
        </div>
        <Reveal className="mt-14 flex justify-center md:mt-[100px]">
          <PillButton to="/works" variant="outline-light" className="min-w-[207px]">
            See All Works
          </PillButton>
        </Reveal>
      </div>
    </section>
  )
}
