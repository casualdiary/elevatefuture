import { Navigate, useParams } from 'react-router-dom'
import { ArticleBody } from '../components/ArticleBody'
import { NextUp, nextImages } from '../components/NextUp'
import { Meta, MetaStack, PageBanner } from '../components/PageBanner'
import { DetailSkeleton } from '../components/ContentStatus'
import { useContent } from '../data/content'

export default function NewsDetail() {
  const { slug } = useParams()
  const { news, status } = useContent()
  const i = news.findIndex((n) => n.slug === slug)
  if (i < 0) return status === 'loading' ? <DetailSkeleton /> : <Navigate to="/news" replace />
  const item = news[i]
  const next = news[(i + 1) % news.length]
  const title = item.slug === 'metaverse-is-still-a-thing' ? 'Metaverse is still a thing?' : item.title
  return (
    <>
      <PageBanner
        title={title}
        size="lg"
        leading={1.25}
        introSize="sm"
        intro={
          ('detail' in item && typeof item.detail === 'string' && item.detail) ||
          (item.slug === 'metaverse-is-still-a-thing'
            ? 'Is Metaverse still a thing? A Qlik study of C-suite executives titled "Data Literacy: The Upskilling Evolution" found that over 99% of them will hire new roles in the next decade, including chief metaverse officer.'
            : item.body)
        }
        aside={
          <MetaStack>
            <Meta label="Date">{item.date}</Meta>
            <Meta label="Author">{item.author}</Meta>
          </MetaStack>
        }
      />
      <ArticleBody lead="As the metaverse space continues to grow, many non-professional creators also expect it to bring new job opportunities." />
      <NextUp label="Next Post" title={next.title} to={`/news/${next.slug}`} img={nextImages.pixar} />
    </>
  )
}
