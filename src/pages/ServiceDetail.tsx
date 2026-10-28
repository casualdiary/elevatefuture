import { Navigate, useParams } from 'react-router-dom'
import { ArticleBody } from '../components/ArticleBody'
import { NextUp, nextImages } from '../components/NextUp'
import { PageBanner } from '../components/PageBanner'
import { RecentWorks } from '../components/RecentWorks'
import { DetailSkeleton } from '../components/ContentStatus'
import { useContent } from '../data/content'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { services: serviceItems, status } = useContent()
  const i = serviceItems.findIndex((s) => s.slug === slug)
  if (i < 0) return status === 'loading' ? <DetailSkeleton /> : <Navigate to="/services" replace />
  const service = serviceItems[i]
  const next = serviceItems[(i + 1) % serviceItems.length]
  return (
    <>
      <PageBanner
        title={service.title}
        size="lg"
        leading={1.875}
        intro="Collaborating together, we have the incredible potential to create extraordinary and innovative projects."
      />
      <ArticleBody tight lead="As the metaverse space continues to grow, many non-professional creators also expect it to bring new job opportunities." />
      <RecentWorks title="Related Works" id="related-works" />
      <NextUp label="Next Service" title={next.title} to={`/services/${next.slug}`} img={nextImages.pixar} />
    </>
  )
}
