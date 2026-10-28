import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container } from '../components/Blocks'
import { FilterChips } from '../components/FilterChips'
import { PageBanner } from '../components/PageBanner'
import { useContent } from '../data/content'
import { ease, Reveal } from '../lib/motion'

const options = ['Write us', 'Book a calendar'] as const
const interests = ['Animation', 'Immersive Content', '3D Asset', 'Still have no idea']
const budgets = ['10 - 20k', '20 - 30k', '40 - 50k', '50 - 100k', '> 100k']

/** Contact ("Write us") and Contact - Book ("Book a calendar") share the banner; the chips are route tabs. */
export default function Contact() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const booking = pathname.endsWith('/book')
  const { quote, testimonials } = useContent()
  const t = testimonials[0]

  return (
    <>
      <PageBanner
        title="Consultation"
        dot
        introSize="md"
        intro={`Book a call or write us to discover our different options. Whether it's membership for recurring missions or more "classic" quotes for big projects, we have the right package for you.`}
        aside={
          <div className="flex flex-col gap-[30px]">
            <FilterChips
              id="contact-options"
              as="tabs"
              label="Options"
              options={options}
              value={booking ? 'Book a calendar' : 'Write us'}
              onChange={(o) => navigate(o === 'Book a calendar' ? '/contact/book' : '/contact', { preventScrollReset: true })}
            />
            <div>
              <p className="text-[16px] text-[#7c7c7c]">What they say about us</p>
              <figure className="relative mt-[19px] ml-px flex max-w-[403px] gap-[25px] rounded-lg bg-white p-4">
                <img src="/assets/ui/tooltip-caret.svg" alt="" aria-hidden width={12} height={9} className="absolute -top-[9px] left-4" />
                <img src={t.avatar} alt={t.name} width={24} height={24} className="size-6 shrink-0 rounded-full object-cover" />
                <div>
                  <blockquote className="font-serif text-[14px] leading-[24px] italic">{quote}</blockquote>
                  <figcaption className="mt-2 text-[12px] leading-[28px] font-medium">{t.name}</figcaption>
                </div>
              </figure>
            </div>
          </div>
        }
      />
      <AnimatePresence mode="wait" initial={false}>
        {booking ? (
          <motion.div key="book" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
            <BookCalendar />
          </motion.div>
        ) : (
          <motion.div key="write" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
            <WriteUs />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border border-ink px-5 py-3 font-display text-[14px] font-medium transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 active:scale-95 md:px-[30px] md:py-4 md:text-[16px] ${
        active ? 'bg-ink text-lime' : 'text-ink hover:bg-lime'
      }`}
    >
      {label}
    </button>
  )
}

function Field({ name, label, type = 'text', textarea }: { name: string; label: string; type?: string; textarea?: boolean }) {
  const cls =
    'peer w-full resize-none bg-transparent pb-[14px] pl-1.5 text-[20px] leading-[45px] text-ink placeholder:text-[#a2a2a2] focus:outline-none md:pb-[18px] md:text-[28px]'
  return (
    <label className="group relative block max-w-[830px]">
      <span className="sr-only">{label}</span>
      {textarea ? (
        <textarea name={name} rows={1} placeholder={label} className={cls} required />
      ) : (
        <input name={name} type={type} placeholder={label} className={cls} required />
      )}
      <img src="/assets/ui/line-input.svg" alt="" aria-hidden width={830} height={2} className="block h-0.5 w-full" />
      <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-ink transition-transform duration-500 peer-focus:scale-x-100" />
    </label>
  )
}

function WriteUs() {
  const [interest, setInterest] = useState<string[]>([])
  const [budget, setBudget] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const toggle = (v: string) => setInterest((xs) => (xs.includes(v) ? xs.filter((x) => x !== v) : [...xs, v]))
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true) // demo only — no backend is wired
  }

  return (
    <Container className="pt-16 pb-20 md:pt-[100px] md:pb-[120px]">
      <form onSubmit={submit} className="relative">
        <Reveal>
          <h2 className="font-display text-[30px] leading-[1.2] font-medium text-[#494949] md:text-[45px] md:leading-[45px]">
            Hey! Tell us all the things <span aria-hidden>👋</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mt-10 md:mt-[79px]">
          <fieldset>
            <legend className="pl-1.5 text-[22px] leading-[45px] text-[#494949] md:text-[28px]">I’m interested in</legend>
            <div className="mt-3 flex flex-wrap gap-3 md:mt-[18px] md:gap-[17px]">
              {interests.map((i) => (
                <Toggle key={i} label={i} active={interest.includes(i)} onClick={() => toggle(i)} />
              ))}
            </div>
          </fieldset>
        </Reveal>
        <div className="mt-12 flex flex-col gap-[38px] md:mt-[41px]">
          <Reveal><Field name="name" label="Your name" /></Reveal>
          <Reveal delay={0.05}><Field name="email" type="email" label="Your email address" /></Reveal>
          <Reveal delay={0.1}><Field name="project" label="Tell us about your project" textarea /></Reveal>
        </div>
        <Reveal className="mt-12 md:mt-10">
          <fieldset>
            <legend className="pl-1.5 text-[22px] leading-[45px] text-[#494949] md:text-[28px]">Budget</legend>
            <div role="radiogroup" className="mt-3 flex flex-wrap gap-3 md:mt-[18px] md:gap-[17px]">
              {budgets.map((b) => (
                <Toggle key={b} label={b} active={budget === b} onClick={() => setBudget(b)} />
              ))}
            </div>
          </fieldset>
        </Reveal>

        <motion.button
          type="submit"
          className="group relative mt-14 flex size-[132px] items-center justify-center lg:absolute lg:top-[290px] lg:right-[97px] lg:mt-0 lg:size-[164px]"
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <img src="/assets/ui/submit-circle.svg" alt="" width={164} height={164} className="absolute inset-0 size-full" />
          <span className="relative flex items-center gap-[30px] pl-1 text-[20px] text-black md:text-[24px]">
            Submit
            <img src="/assets/ui/submit-arrow.svg" alt="" width={16} height={16} className="transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </motion.button>

        <AnimatePresence>
          {sent && (
            <motion.p
              role="status"
              className="mt-8 inline-flex rounded-full bg-lime px-6 py-3 font-display text-[16px] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Thanks! We’ll get back to you within one working day.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </Container>
  )
}

function BookCalendar() {
  return (
    <Container className="pt-16 pb-20 md:pt-[100px] md:pb-[120px]">
      <Reveal>
        <h2 className="font-display text-[30px] leading-[1.2] font-medium text-[#494949] md:text-[45px] md:leading-[45px]">
          Book a calendar <span aria-hidden>🗓️</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 md:mt-[80px]">
        <div className="max-w-[792px] overflow-hidden rounded-[20px] border border-soft lg:ml-0.5">
          <img src="/assets/ui/calendar-embed.png" alt="Calendar booking widget: pick a date and time for a 30-minute call" width={792} height={690} className="block w-full" />
        </div>
      </Reveal>
    </Container>
  )
}
