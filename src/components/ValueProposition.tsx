import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LineReveal, Reveal } from '../lib/motion'

export function ValueProposition() {
  return (
    <section id="solutions" className="relative isolate overflow-hidden bg-cream">
      <img
        src="/assets/value-texture.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -inset-x-[11px] top-[2px] -z-10 h-full w-[calc(100%+22px)] object-cover opacity-50 mix-blend-darken"
      />
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-24 md:px-10 md:pt-[108px] md:pb-[145px] xl:px-20">
        <h2 className="max-w-[1034px] font-display text-display font-medium">
          <span className="sr-only">From illustration to animation, scripting to sound design, we love all things motion.</span>
          <span aria-hidden className="hidden xl:block">
            <LineReveal lines={['From illustration to animation,', 'scripting to sound design, we love all', 'things motion.']} />
          </span>
          <span aria-hidden className="xl:hidden">
            <LineReveal lines={['From illustration to animation, scripting to sound design, we love all things motion.']} />
          </span>
        </h2>

        <div className="mt-10 max-w-[947px] md:mt-[50px] lg:ml-[332px]">
          <Reveal>
            <p className="text-[18px] leading-[30px] font-light tracking-[-0.01em] md:text-[24px] md:leading-[40px]">
              Animation as a medium is impactful and engaging. It connects with people on an emotional level and
              inspires action. A smart and striking piece of animation can change your mood, your mind, and even the
              world around you.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[18px] leading-[30px] font-light tracking-[-0.01em] md:mt-10 md:text-[24px] md:leading-[40px]">
              Its ability to evoke emotions and convey messages in a visually compelling way makes animation a
              versatile tool for storytelling. Whether aiming to entertain, educate, or advocate, the influence of
              animation extends beyond mere visuals, creating a profound and lasting impact on its audience.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-2 text-[20px] leading-[40px] tracking-[-0.01em] text-ember md:mt-10 md:text-[24px]"
            >
              <motion.img
                src="/assets/arrow-orange.svg"
                alt=""
                width={18}
                height={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"
              />
              <span className="underline decoration-from-font underline-offset-[5px] transition-[text-underline-offset] group-hover:underline-offset-[8px]">
                Find out more
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
