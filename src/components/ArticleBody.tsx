import { Reveal } from '../lib/motion'
import { Container, Lead, MediaBox, TwoBoxes } from './Blocks'

const copy =
  "Revamp the digital assets for Lazada's sales campaigns, emphasizing creativity and strategic distribution. Elevate must enhance the campaign identity with a focus on typography, a distinctive logo, an animated mascot, and impactful 3D graphics. The challenge is to ensure these assets resonate across the expansive Asia Pacific region, elevating Lazada's campaigns and generating substantial engagement."

/** Body of News/Service detail: lead, two images, "Heading 1" with two text columns, wide image. */
export function ArticleBody({ lead, tight }: { lead: string; tight?: boolean }) {
  return (
    <Container className={`pt-16 pb-16 md:pt-[100px] ${tight ? 'md:pb-[100px]' : 'md:pb-[120px]'}`}>
      <Lead>{lead}</Lead>
      <div className="mt-12 md:mt-20">
        <TwoBoxes />
      </div>
      <Reveal className="mt-14 md:mt-20">
        <h2 className="font-display text-[24px] font-medium md:text-[28px]">Heading 1</h2>
      </Reveal>
      <div className="mt-6 grid gap-6 md:mt-[30px] md:grid-cols-2 md:gap-10 lg:grid-cols-[minmax(0,618fr)_minmax(0,591fr)] lg:gap-x-[46px] lg:pl-0.5">
        <Reveal>
          <p className="text-[17px] leading-[30px] font-light md:text-[20px] md:leading-[38px]">{copy}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17px] leading-[30px] font-light md:text-[20px] md:leading-[38px]">{copy}</p>
        </Reveal>
      </div>
      <MediaBox className="mt-14 aspect-[1280/576] w-full md:mt-[150px]" />
    </Container>
  )
}
