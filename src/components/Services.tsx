import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ease, Reveal } from '../lib/motion'
import { PillButton } from './PillButton'

const services = ['Immersive Content', 'Brand Video', 'TVC', 'Campaign Branding', 'Digital Content']

// Preview card geometry from Figma (375×288 card, pointer tip at 247,145 inside it).
const CARD_W = 375
const POINTER = { x: 255, y: 153 } // arrow tip (svg tip is at 8,8)
// Default resting spot: card left at 739/1440 of the width, top aligned with the section title.
const REST = { xRatio: 739 / 1440, y: 0 }

export function Services() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const areaRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  const rest = () => {
    const w = areaRef.current?.offsetWidth ?? 1440
    x.set(Math.min(REST.xRatio * w, w - CARD_W - 20))
    y.set(REST.y)
  }

  return (
    <section id="services" className="bg-paper pt-20 pb-24 md:pt-[120px] md:pb-[120px]">
      <div
        ref={areaRef}
        className="relative mx-auto max-w-[1440px]"
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = areaRef.current!.getBoundingClientRect()
          x.set(e.clientX - r.left - POINTER.x)
          y.set(e.clientY - r.top - POINTER.y)
        }}
        onPointerLeave={() => {
          setHovering(false)
          setActive(0)
          rest()
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setHovering(true)
        }}
      >
        <Reveal className="px-5 md:px-10 xl:px-20">
          <h2 className="font-display text-[28px] font-medium tracking-[-0.02em] md:text-[32px]">Our Services</h2>
        </Reveal>

        <ul
          className={`mt-6 md:mt-[31px] ${hovering ? 'lg:cursor-none' : ''}`}
          onPointerLeave={() => setActive(0)}
        >
          {services.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease, delay: i * 0.06 }}
            >
              {i === 0 && <img src="/assets/line-service.svg" alt="" aria-hidden width={1440} height={1} className="block h-px w-full" />}
              <Link
                to="/services"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative block overflow-hidden"
              >
                <span
                  className={`absolute inset-0 origin-bottom bg-coral transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    active === i ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />
                <span
                  className={`relative block px-5 py-5 font-display text-[length:clamp(2rem,1.2rem+3.3vw,3.75rem)] leading-[1.26] font-medium transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:px-10 md:py-[30px] xl:px-20 ${
                    active === i && hovering ? 'md:translate-x-4' : ''
                  }`}
                >
                  {s}
                </span>
              </Link>
              <img src="/assets/line-service.svg" alt="" aria-hidden width={1440} height={1} className="block h-px w-full" />
            </motion.li>
          ))}
        </ul>

        {/* Floating preview — pointer devices, ≥1024px */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block"
          style={{ x: sx, y: sy }}
          ref={(el) => {
            if (el && x.get() === 0 && y.get() === 0) {
              rest()
              sx.jump(x.get())
              sy.jump(y.get())
            }
          }}
        >
          <motion.div
            className="relative h-[288px] w-[375px] rounded-lg bg-ink"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <motion.img
              key={active}
              src="/assets/service-preview.png"
              alt=""
              className="absolute top-[54px] left-[27px] h-[181px] w-[321px] object-cover"
              initial={{ opacity: 0.4, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease }}
            />
            <img
              src="/assets/mouse-pointer.svg"
              alt=""
              width={48}
              height={48}
              className="absolute top-[145px] left-[247px]"
            />
          </motion.div>
        </motion.div>

        <Reveal className="mt-10 flex justify-center md:mt-[60px]">
          <PillButton to="/services" variant="outline-dark" className="min-w-[239px]">
            See all services
          </PillButton>
        </Reveal>
      </div>
    </section>
  )
}
