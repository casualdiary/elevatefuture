import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../data/site'
import { ease } from '../lib/motion'
import { PillButton } from './PillButton'


function useSingaporeTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Singapore',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Nav({ intro = true }: { intro?: boolean }) {
  const time = useSingaporeTime()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? 'bg-paper/80 py-3 shadow-[0_1px_0_rgba(25,34,38,0.08)] backdrop-blur-md'
          : 'bg-transparent py-5 lg:pt-[54px]'
      }`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: intro ? 1.7 : 0.1 }}
    >
      <nav className="mx-auto flex h-12 items-center justify-between px-5 md:px-10" aria-label="Main">
        <Link to="/" className="relative z-10 shrink-0 transition-opacity hover:opacity-70" aria-label="Elevate home">
          <img
            src={open ? '/assets/preloader-logo.svg' : '/assets/logo-elevate-dark.svg'}
            alt="Elevate"
            width={89.0913}
            height={24}
          />
        </Link>

        <ul className="absolute left-[calc(50%+5px)] hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <NavLink to={l.to} end={l.to.startsWith('/#')} className="group relative font-display text-base font-medium text-ink">
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-full bg-ink transition-transform duration-300 ${
                        isActive && !l.to.startsWith('/#')
                          ? 'scale-x-100'
                          : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <PillButton to="/contact" className="tracking-[0.01em]">
              Get a Consultation
            </PillButton>
          </li>
        </ul>

        <div className="hidden items-center gap-1 font-display text-base font-medium lg:flex">
          <img src="/assets/clock-nav.svg" alt="" width={20} height={18.9823} className="mr-1" />
          <time className="tabular-nums" aria-label="Local time in Singapore">{time}</time>
          <span className="ml-2">Singapore</span>
        </div>

        <button
          type="button"
          className="relative z-10 flex size-11 flex-col items-center justify-center gap-[6px] rounded-full bg-lime transition-transform active:scale-90 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-[2px] w-5 bg-ink transition-transform duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-5 bg-ink transition-transform duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 flex flex-col bg-ink px-5 pt-24 pb-10 text-paper lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 42px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 42px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 42px) 44px)' }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {[...navLinks, { label: 'Careers', to: '/careers' }].map((l) => (
                <motion.li
                  key={l.label}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block py-1 font-display text-[44px] font-medium tracking-[-0.02em] transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto flex flex-col gap-6">
              <PillButton to="/contact" className="self-start" onClick={() => setOpen(false)}>
                Get a Consultation
              </PillButton>
              <div className="flex items-center gap-2 font-display font-medium text-soft">
                <span className="tabular-nums">{time}</span> Singapore
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
