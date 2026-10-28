import { BodyP, Container, Indented, MediaBox, Statement } from '../components/Blocks'
import { PageBanner } from '../components/PageBanner'
import { Partners } from '../components/Partners'
import { TeamGrid } from '../components/TeamGrid'

export default function About() {
  return (
    <>
      <PageBanner
        title="About us"
        dot
        introRaised
        intro="Since day one, we’ve tried to build an environment where talented people are supported to grow and create great work that matters together."
      />
      <MediaBox tone="#e2e2e2" className="aspect-[1440/806] min-h-[260px] w-full" label="Studio showreel still" />
      <Container className="pt-16 pb-20 md:pt-20 md:pb-[120px]">
        <Statement>We know animation, motion graphics and immersive content.</Statement>
        <Indented className="mt-10 flex flex-col gap-10 md:mt-[50px]">
          <BodyP>
            But when it comes to your business, audiences and your industry, you're the experts who know it best. We believe in working together to co-create the content that we will all love.
          </BodyP>
          <BodyP delay={0.05}>
            Before getting into anything creative, we like to really understand your brand and brief, understanding what makes you tick and smile! We will then work with you together at every stage of the process, looping you and your team into our process - from small and big agency partners, as well as wider business stakeholders when necessary.
          </BodyP>
          <BodyP delay={0.1}>
            We believe that this will result in the outcome that everyone can be proud of. Get to know more about our team and our work in the following pages.
          </BodyP>
        </Indented>
      </Container>
      <TeamGrid />
      <Partners id="clients" lines={['Clients']} repeat={2} gridGap="md:mt-[100px]" />
    </>
  )
}
