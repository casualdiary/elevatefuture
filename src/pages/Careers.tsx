import { Accordion } from '../components/Accordion'
import { Container, Indented, MediaBox, Statement } from '../components/Blocks'
import { PageBanner } from '../components/PageBanner'
import { useContent } from '../data/content'

export default function Careers() {
  const { jobs } = useContent()
  return (
    <>
      <PageBanner
        title="Careers"
        dot
        intro="We collect intelligent, sweet, smiling, talented people who are capable of creating on a level that is hard to find elsewhere."
      />
      <Container className="pt-16 pb-20 md:pt-[120px] md:pb-[120px]">
        <Statement>Job openings</Statement>
        <Indented className="mt-10 md:mt-[120px] lg:ml-[333px]">
          <Accordion cta="Apply to this job" items={jobs.map((j) => ({ ...j, meta: [j.type, j.location].filter(Boolean).join(' · '), to: '/contact' }))} />
        </Indented>
        <MediaBox className="mt-16 aspect-[1280/576] w-full md:mt-[120px]" />
      </Container>
    </>
  )
}
