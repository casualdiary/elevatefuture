import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useContent } from '../data/content'

/** Small "loading content" pill while the Wix CMS request is in flight (only if it takes > 400ms). */
export function ContentStatus() {
  const { status } = useContent()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (status !== 'loading') {
      setShow(false)
      return
    }
    const t = setTimeout(() => setShow(true), 400)
    return () => clearTimeout(t)
  }, [status])
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-5 z-[70]">
      <AnimatePresence>
        {show && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex items-center gap-2 rounded-full bg-ink/90 px-4 py-2 text-[13px] font-medium text-paper shadow-lg"
          >
            <span className="size-3 animate-spin rounded-full border-2 border-paper/30 border-t-lime" aria-hidden />
            Loading content…
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Placeholder for a detail page whose item is not in the local copy yet (a new CMS item still loading). */
export function DetailSkeleton() {
  return (
    <div aria-busy className="mx-auto max-w-[1440px] animate-pulse px-5 pt-40 pb-32 md:px-10 xl:px-20">
      <div className="h-16 w-2/3 rounded-lg bg-ink/10 md:h-24" />
      <div className="mt-10 h-5 w-full max-w-[640px] rounded bg-ink/10" />
      <div className="mt-3 h-5 w-full max-w-[560px] rounded bg-ink/10" />
      <div className="mt-16 aspect-[1440/806] w-full rounded-lg bg-ink/10" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
