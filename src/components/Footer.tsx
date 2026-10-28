import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ease, LineReveal, Reveal, stagger } from '../lib/motion'

const clients = ['Giant', 'Grab', 'MTV Asia', 'McDonalds', 'Lazada', 'Formula 1']
const services = ['TVC', 'Immersive Content', 'Marketing Campaign', 'Brand Video', 'Digital Content']
const socials = [
  { name: 'LinkedIn', src: '/assets/social-linkedin.svg', w: 22.5, h: 24 },
  { name: 'Instagram', src: '/assets/social-instagram.svg', w: 24, h: 23.9743 },
  { name: 'Dribbble', src: '/assets/social-dribbble.svg', w: 22.4001, h: 22.4, box: 'size-6' },
  { name: 'Behance', src: '/assets/social-behance.svg', w: 23.4504, h: 14.8082, box: 'h-4 w-6' },
]

const linkCls =
  'relative inline-block text-[18px] tracking-[-0.02em] text-soft transition-colors duration-300 hover:text-lime'

/** variant: 'home' (homepage frame), 'inner' (inner pages have ~230px more dark space), 'careers' (lime marquee in that space) */
export function Footer({ variant = 'home' }: { variant?: 'home' | 'inner' | 'careers' }) {
  const marquee = variant === 'careers'
  const pb = variant === 'inner' ? 'md:pb-[365px]' : variant === 'careers' ? 'md:pb-[204px]' : 'md:pb-[135px]'
  return (
    <footer id="contact" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-[120px] xl:px-20">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between md:gap-6">
          <h2 className="font-display text-display font-medium">
            <span className="sr-only">Let’s collaborate together and make great stuff</span>
            <span aria-hidden className="hidden md:block">
              <LineReveal lines={['Let’s collaborate together', 'and make great stuff']} />
            </span>
            <span aria-hidden className="md:hidden">
              <LineReveal lines={['Let’s collaborate together and make great stuff']} />
            </span>
          </h2>
          <MotionLink
            to="/contact"
            aria-label="Start a project with us"
            className="group shrink-0 rounded-full"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.3 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <img
              src="/assets/cta-cursor-lg.svg"
              alt=""
              width={115}
              height={115}
              className="w-[80px] transition-transform duration-500 group-hover:rotate-45 md:mt-1 md:mr-[13px] md:w-auto"
            />
          </MotionLink>
        </div>
        

        <motion.img
          src="/assets/line-footer.svg"
          alt=""
          aria-hidden
          width={1280}
          height={1}
          className="mt-14 block h-px w-full origin-left md:mt-[121px]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />

        <motion.div
          className={`grid grid-cols-2 gap-x-6 gap-y-12 pt-10 pb-16 lg:grid-cols-[minmax(0,414px)_minmax(0,213px)_minmax(0,1fr)_300px] lg:gap-x-0 md:pt-14 ${pb}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          {/* Brand */}
          <motion.div
            className="col-span-2 lg:col-span-1 lg:pl-[5px]"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            <img src="/assets/logo-elevate-light.svg" alt="Elevate" width={111.363} height={30} />
            <p className="mt-5 max-w-[279px] text-[20px] leading-[32px] text-white">
              We know animation, motion graphics, and immersive content.
            </p>
            <ul className="mt-8 flex items-center gap-5 md:mt-[39px]">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href="#"
                    aria-label={s.name}
                    className={`flex items-center justify-center transition-[transform,opacity] duration-300 hover:-translate-y-1 hover:opacity-70 ${s.box ?? ''}`}
                  >
                    <img src={s.src} alt="" width={s.w} height={s.h} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Clients */}
          <motion.nav
            aria-label="Clients"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            <h3 className="font-display text-[18px] font-medium tracking-[-0.02em]">Clients</h3>
            <ul className="mt-[22px] flex flex-col gap-3">
              {clients.map((c) => (
                <li key={c}>
                  <Link to="/about" className={linkCls}>{c}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav
            aria-label="Services"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            <h3 className="font-display text-[18px] font-medium tracking-[-0.02em]">Services</h3>
            <ul className="mt-[22px] flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services" className={linkCls}>{s}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact + awards */}
          <motion.div
            className="col-span-2 lg:col-span-1 lg:-ml-[1px]"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            <p className="font-display text-[18px] font-medium tracking-[-0.02em]">Lets work together</p>
            <Link to="/contact/book" className="group mt-3 flex items-center gap-[57px]">
              <span className="text-[32px] tracking-[-0.02em] transition-colors group-hover:text-lime">Call us</span>
              <img
                src="/assets/cta-cursor-sm.svg"
                alt=""
                width={32}
                height={32}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </Link>
            <img src="/assets/line-callus.svg" alt="" aria-hidden width={300} height={1} className="mt-4 block w-full max-w-[300px]" />
            <p className="mt-5 font-display text-[18px] font-medium tracking-[-0.02em]">Awards</p>
            <img
              src="/assets/award-mevents-2022.png"
              alt="The Marketing Events Awards 2022"
              className="mt-[13px] h-[66px] w-[195.395px] object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {marquee && <Marquee />}

      <Reveal amount={0.1} className="bg-paper text-ink">
        <div className="mx-auto flex h-[50px] max-w-[1440px] items-center justify-between gap-4 px-5 text-[12px] md:px-[27px] md:text-[14px]">
          <p>
            Elevate Future Lab © 2024
            <Link to="/careers" className="ml-4 underline-offset-4 hover:text-ember hover:underline">
              Careers
            </Link>
          </p>
          <Link to="/contact/book" className="group flex items-center gap-2 hover:text-ember">
            <img src="/assets/clock-footer.svg" alt="" width={18} height={18} className="transition-transform duration-700 group-hover:rotate-[360deg]" />
            We are at work, call us
          </Link>
        </div>
      </Reveal>
    </footer>
  )
}

const MotionLink = motion.create(Link)

/** Careers footer: lime band with the Elevate wordmark scrolling endlessly (Figma "Scroller"). */
function Marquee() {
  const logos = Array.from({ length: 6 })
  return (
    <div className="overflow-hidden bg-lime py-[30px]" aria-hidden>
      <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-[204px] pl-10 motion-reduce:animate-none">
        {[...logos, ...logos].map((_, i) => (
          <img key={i} src="/assets/ui/logo-elevate-marquee.svg" alt="" width={373} height={100.482} className="h-[60px] w-auto md:h-[100.482px]" />
        ))}
      </div>
    </div>
  )
}
