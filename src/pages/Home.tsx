import { Hero } from '../components/Hero'
import { News } from '../components/News'
import { Partners } from '../components/Partners'
import { RecentWorks } from '../components/RecentWorks'
import { Services } from '../components/Services'
import { ValueProposition } from '../components/ValueProposition'

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <RecentWorks />
      <Services />
      <Partners />
      <News />
    </>
  )
}
