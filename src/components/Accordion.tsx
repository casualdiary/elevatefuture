import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ease } from '../lib/motion'

type Item = { title: string; body: string; to: string; meta?: string }

const Line = () => <img src="/assets/ui/line-accordion.svg" alt="" aria-hidden width={920} height={1} className="block h-px w-full" />

/** Services / Job openings accordion (920px column, 83px rows, first item open). */
export function Accordion({ items, cta }: { items: Item[]; cta: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  return (
    <div className="w-full max-w-[920px]">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease, delay: i * 0.06 }}
          >
            <Line />
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-4 text-left md:h-[83px] md:py-0"
              >
                <span className="font-display text-[24px] font-medium transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 md:text-[34px]">
                  {it.title}
                </span>
                <motion.img
                  src="/assets/ui/icon-plus.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="mr-[17px] size-6 shrink-0 md:size-8"
                  animate={{ rotate: isOpen ? -45 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <Line />
                  <div className="flex flex-col pt-6 pb-6 md:min-h-[165px] md:pb-[22px]">
                    {it.meta && <p className="mb-2 text-[14px] leading-[24px] font-medium tracking-[-0.01em] text-muted">{it.meta}</p>}
                    <p className="max-w-[850px] text-[16px] leading-[28px] font-light tracking-[-0.01em]">{it.body}</p>
                    <Link
                      to={it.to}
                      className="group/link mt-[22px] inline-flex items-center gap-2 self-start md:mt-auto md:pt-[22px] text-[14px] tracking-[-0.01em] text-ember underline underline-offset-2"
                    >
                      <img
                        src="/assets/ui/arrow-orange-sm.svg"
                        alt=""
                        width={12}
                        height={12}
                        className="transition-transform duration-300 group-hover/link:rotate-45"
                      />
                      {cta}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {i === items.length - 1 && <Line />}
          </motion.div>
        )
      })}
    </div>
  )
}
