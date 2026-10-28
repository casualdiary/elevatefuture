import { motion } from 'framer-motion'
import { team } from '../data/site'
import { ease, stagger } from '../lib/motion'

/** "Our Team" mosaic: 3 columns of 394px, wide cards span two (rows 2 and 4). */
export function TeamGrid() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-20 md:px-10 md:pt-[102px] md:pb-[177px] xl:pr-[85px] xl:pl-[81px]">
        <motion.h2
          className="font-display text-[28px] font-medium tracking-[-0.02em] text-paper md:text-[32px]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          Our Team
        </motion.h2>
        <motion.ul
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-[66px] lg:grid-cols-3 lg:gap-x-[46px] lg:gap-y-[52px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger(0.07)}
        >
          {team.map((m, i) => (
            <motion.li
              key={i}
              className={`group relative flex h-[300px] flex-col justify-end overflow-hidden rounded-lg bg-[#d9d9d9] p-6 md:h-[343px] md:pb-[40px] ${
                m.wide ? 'sm:col-span-2' : ''
              }`}
              variants={{ hidden: { opacity: 0, y: 40, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } } }}
            >
              <span className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="relative font-display text-[28px] font-medium tracking-[-0.02em] transition-transform duration-500 group-hover:-translate-y-1">{m.name}</p>
              <p className="relative mt-0.5 text-[18px] tracking-[-0.02em]">{m.role}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
