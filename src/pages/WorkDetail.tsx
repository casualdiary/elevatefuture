import { Navigate, useParams } from 'react-router-dom'
import { Container, Lead, MediaBox, SplitText, TwoBoxes } from '../components/Blocks'
import { NextUp, nextImages } from '../components/NextUp'
import { Chip, Meta, MetaStack, PageBanner } from '../components/PageBanner'
import { DetailSkeleton } from '../components/ContentStatus'
import { useContent } from '../data/content'

// Copy from the Figma "Works - Detailed" frame (Lazada case study); used as the template for every work.
const challenge =
  "Revamp the digital assets for Lazada's sales campaigns, emphasizing creativity and strategic distribution. Elevate must enhance the campaign identity with a focus on typography, a distinctive logo, an animated mascot, and impactful 3D graphics. The challenge is to ensure these assets resonate across the expansive Asia Pacific region, elevating Lazada's campaigns and generating substantial engagement."

export default function WorkDetail() {
  const { slug } = useParams()
  const { works, status } = useContent()
  const i = works.findIndex((w) => w.slug === slug)
  if (i < 0) return status === 'loading' ? <DetailSkeleton /> : <Navigate to="/works" replace />
  const work = works[i]
  const nextWork = works[(i + 1) % works.length]

  return (
    <>
      <PageBanner
        title={work.name}
        leading={2 / 3}
        introSize="sm"
        intro={`Elevate played a key role in creating compelling digital assets for ${work.name}'s sales campaigns. Our collaboration with the regional team resulted in a captivating campaign identity, featuring typography, a unique logo, an animated mascot, and impressive 3D graphics. These assets were strategically distributed across the vast Asia Pacific region, significantly boosting ${work.name}'s campaigns and driving widespread engagement.`}
        aside={
          <MetaStack>
            <div>
              <p className="text-[16px] text-[#7c7c7c]">Project Type</p>
              <div className="mt-[18px] flex flex-wrap gap-4 pl-px">
                {(work.projectType?.length ? work.projectType : ['Campaign Identity', 'Asset Creation']).map((p) => (
                  <Chip key={p}>{p}</Chip>
                ))}
              </div>
            </div>
            <Meta label="Creative Director">Dionisius K.</Meta>
            <Meta label="Year">{work.year ?? 2023}</Meta>
          </MetaStack>
        }
      />
      <MediaBox tone="#e2e2e2" play className="aspect-[1440/806] min-h-[260px] w-full" label={`${work.name} campaign video`} />

      <Container className="flex flex-col gap-16 py-16 md:gap-[100px] md:pt-[100px] md:pb-[150px]">
        <Lead>
          {work.description ??
            (work.name === 'Lazada'
              ? 'Lazada Group is an international e-commerce company and one of the largest e-commerce operators in Southeast Asia.'
              : `${work.name} partnered with Elevate to bring a regional campaign to life across Southeast Asia.`)}
        </Lead>
        <SplitText title="The Challange">{challenge}</SplitText>
        <TwoBoxes />
        <SplitText title="The Solution">{challenge}</SplitText>
        <MediaBox className="aspect-[1280/576] w-full" />
        <SplitText title="Testimonial">
          Elevate's innovative design transformed {work.name}'s digital assets, boosting engagement across Asia Pacific. Invaluable partners for creativity and excellence.
          <span className="mt-[38px] block font-normal">Tony Doe, Head of Marketing {work.name}</span>
        </SplitText>
      </Container>

      <NextUp label="Next Project" title="Intergalactic Odyssey" to={`/works/${nextWork.slug}`} img={nextImages.hsbc} />
    </>
  )
}
