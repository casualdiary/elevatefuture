import { motion } from 'framer-motion'
import { Accordion } from '../components/Accordion'
import { BodyP, Container, Indented, Lead, MediaBox, Statement } from '../components/Blocks'
import { PageBanner } from '../components/PageBanner'
import { useContent } from '../data/content'
import { ease, Reveal, stagger } from '../lib/motion'

const steps = ['Conception', 'Design', 'Production', 'Integration', 'Operation', 'Launch']
const stepCopy = "Revamp the digital assets for Lazada's sales campaigns, emphasizing creativity and strategic distribution."

export default function ServicesPage() {
  const { services: serviceItems } = useContent()
  return (
    <>
      <PageBanner
        title="Services"
        dot
        intro="Collaborating together, we have the incredible potential to create extraordinary and innovative projects."
      />
      <Container className="pt-16 pb-20 md:pt-[120px] md:pb-[224px]">
        <Statement>From illustration to animation, scripting to sound design, we love ‍all things motion.</Statement>
        <Indented className="mt-10 flex flex-col gap-10 md:mt-[50px]">
          <BodyP>
            Animation as a medium is impactful and engaging. It connects with people on an emotional level and inspires action. A smart and striking piece of animation can change your mood, your mind, and even the world around you.
          </BodyP>
          <BodyP delay={0.05}>
            Its ability to evoke emotions and convey messages in a visually compelling way makes animation a versatile tool for storytelling. Whether aiming to entertain, educate, or advocate, the influence of animation extends beyond mere visuals, creating a profound and lasting impact on its audience.
          </BodyP>
        </Indented>
        <Indented className="mt-16 md:mt-[150px]">
          <Accordion cta="Find out more" items={serviceItems.map((s) => ({ ...s, to: `/services/${s.slug}` }))} />
        </Indented>
        <MediaBox className="mt-16 aspect-[1280/576] w-full md:mt-[150px]" />

        <Lead className="mt-16 md:mt-[120px] lg:ml-[338px] lg:max-w-[942px]">
          Comprising five steps and three fields with specific state gates, our process is designed to ensure a harmonious, cohesive experience for both the team and the client.
        </Lead>
        <Reveal className="mt-12 overflow-x-auto md:mt-20">
          <motion.img
            src="/assets/ui/process-diagram.png"
            alt="Process diagram: five steps across three fields with state gates"
            width={1270}
            height={312}
            className="w-full min-w-[640px]"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease }}
          />
        </Reveal>

        <motion.ol
          className="mt-14 grid gap-12 sm:grid-cols-2 md:mt-[83px] lg:grid-cols-3 lg:gap-x-[81px] lg:gap-y-[61px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger(0.1)}
        >
          {steps.map((s, i) => (
            <motion.li
              key={s}
              className="max-w-[372px]"
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
            >
              <span className="relative flex size-[42px] items-center justify-center">
                <motion.img
                  src="/assets/ui/step-dot.svg"
                  alt=""
                  width={42}
                  height={42}
                  className="absolute inset-0"
                  variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } } }}
                />
                <span className="relative font-display text-[18px] font-medium">{i + 1}</span>
              </span>
              <h3 className="mt-2 font-display text-[20px] font-medium">{s}</h3>
              <p className="mt-[25px] text-[17px] leading-[30px] font-light md:text-[20px] md:leading-[38px]">{stepCopy}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </>
  )
}
