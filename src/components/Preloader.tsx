import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ease } from '../lib/motion'

/** Figma frame "Preloader" (38:369): darkened hero photo with the logo + tagline. */
export function Preloader() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(!reduce)

  useEffect(() => {
    if (reduce) return
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = '')}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] overflow-hidden bg-paper"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden
        >
          <img src="/assets/hero-cabin.png" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-black/[0.69]" />
          <motion.div
            className="relative flex h-full items-center justify-center gap-[17px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease }}
          >
            <img src="/assets/preloader-logo.svg" alt="Elevate" width={89.0913} height={24} />
            <span className="overflow-hidden text-[18px] text-white">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
              >
                We know animation
              </motion.span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
