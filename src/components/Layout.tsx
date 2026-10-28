import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { markIntroPlayed } from '../lib/intro'
import { ease } from '../lib/motion'
import { ContentStatus } from './ContentStatus'
import { Footer } from './Footer'
import { Nav } from './Nav'
import { Preloader } from './Preloader'

/** Sub-routes that are tabs of one page share a transition key (Contact ↔ Contact/Book). */
const pageKey = (path: string) => (path.startsWith('/contact') ? '/contact' : path)

export function Layout() {
  const location = useLocation()
  const key = pageKey(location.pathname)
  const reduce = useReducedMotion()
  // Preloader only on the first load of the tab session.
  const [firstLoad] = useState(() => !sessionStorage.getItem('elevate-loaded'))
  useEffect(() => {
    sessionStorage.setItem('elevate-loaded', '1')
    const t = setTimeout(markIntroPlayed, 2000)
    return () => clearTimeout(t)
  }, [])

  // Scroll to top when the page changes, or to #hash ("/#solutions").
  useLayoutEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }), 500)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, location.hash])

  return (
    <>
      {firstLoad && <Preloader />}
      <ContentStatus />
      <Nav intro={firstLoad} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: reduce ? 0 : 0.15 } }}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.3, ease } }}
        >
          <main>
            <Outlet />
          </main>
          <Footer variant={key === '/' ? 'home' : key.startsWith('/careers') ? 'careers' : 'inner'} />
        </motion.div>
      </AnimatePresence>
      {/* Lime wipe that sweeps up through the viewport on each page change */}
      {!reduce && (
        <AnimatePresence initial={false}>
          <motion.div
            key={key}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60] bg-lime"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{
              clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0 0 0% 0)', 'inset(0 0 100% 0)'],
              transition: { duration: 1, times: [0, 0.35, 0.5, 1], ease: 'easeInOut' },
            }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
          />
        </AnimatePresence>
      )}
    </>
  )
}
