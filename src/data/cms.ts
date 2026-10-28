/**
 * Maps the Wix CMS collections (Works, News, Services, Careers, Testimonials, Clients)
 * onto the app's content types. Editorial content comes from Wix; purely visual
 * settings from the Figma design (card crops, background colours, logo sizes) stay
 * local and are looked up by slug / name, with sensible defaults for new items.
 */
import { queryCollection } from '../wix/client'
import * as local from './site'
import type { NewsItem, Work } from './site'

export type Service = { slug: string; title: string; body: string; image?: string }
export type Job = { title: string; body: string; location?: string; type?: string }
export type Client = { logo: string; name: string; w: number; h: number; text: string; logoOffset?: number; textOffset?: number }
export type Testimonial = { name: string; avatar: string; box: { left: number; top: number; width: number; height: number } }
export type WorkMeta = { client?: string; year?: number; projectType?: string[]; description?: string; gallery?: string[] }

export type Content = {
  works: (Work & WorkMeta)[]
  news: NewsItem[]
  services: Service[]
  jobs: Job[]
  clients: Client[]
  testimonials: Testimonial[]
  quote: string
}

export const localContent: Content = {
  works: local.works,
  news: local.news,
  services: local.serviceItems,
  jobs: local.jobs,
  clients: local.clients.map((c) => ({ ...c })),
  testimonials: local.testimonials,
  quote: local.quote,
}

type Row = Record<string, unknown>
const str = (v: unknown) => (typeof v === 'string' ? v : undefined)
const num = (v: unknown) => (typeof v === 'number' ? v : undefined)
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : undefined)

/** IMAGE fields hold an https URL, or a `wix:image://v1/<id>/<name>` URI when edited in the dashboard. */
export function mediaUrl(v: unknown): string | undefined {
  const s = str(v) ?? str((v as Row | undefined)?.url)
  if (!s) return undefined
  const m = s.match(/^wix:(?:image|vector):\/\/v1\/([^/#]+)/)
  if (m) return s.startsWith('wix:vector') ? `https://static.wixstatic.com/shapes/${m[1]}` : `https://static.wixstatic.com/media/${m[1]}`
  return s
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** DATE fields arrive as "YYYY-MM-DD" (or a {$date} object); the design shows "23 May 2023". */
export function formatDate(v: unknown): string {
  const s = str(v) ?? str((v as Row | undefined)?.$date)
  const m = s?.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return s ?? ''
  return `${m[3]} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`
}

const workCategories = ['Animation', 'Motion Graphics', 'Immersive Content'] as const
const newsCategories = ['Insights', 'Journal', 'Awards'] as const
const pick = <T extends string>(v: unknown, list: readonly T[], dflt: T): T => (list.includes(v as T) ? (v as T) : dflt)

function toWork(r: Row): Work & WorkMeta {
  const slug = str(r.slug) ?? ''
  const design = local.works.find((w) => w.slug === slug)
  const cover = mediaUrl(r.coverImage)
  const visual = design
    ? { bg: design.bg, img: design.logo ? undefined : cover ?? design.img, placement: design.placement, logo: design.logo, bands: design.bands }
    : { bg: '#e2e2e2', img: cover, placement: cover ? { left: 0, top: 0, width: 100, height: 100 } : undefined }
  return {
    slug,
    name: str(r.title) ?? '',
    tag: str(r.tag) ?? 'Marketing Campaign',
    category: pick(r.category, workCategories, 'Animation'),
    ...visual,
    client: str(r.client),
    year: num(r.year),
    projectType: strs(r.projectType),
    description: str(r.description),
    gallery: strs(r.gallery)?.map((g) => mediaUrl(g) ?? g),
  }
}

function toNews(r: Row): NewsItem & { detail?: string } {
  return {
    slug: str(r.slug) ?? '',
    title: str(r.title) ?? '',
    body: str(r.excerpt) ?? '',
    detail: str(r.body),
    img: mediaUrl(r.coverImage) ?? '',
    alt: str(r.coverAlt) ?? str(r.title) ?? '',
    category: pick(r.category, newsCategories, 'Insights'),
    date: formatDate(r.date),
    author: str(r.author) ?? '',
  }
}

const toService = (r: Row): Service => ({
  slug: str(r.slug) ?? '',
  title: str(r.title) ?? '',
  body: str(r.shortDescription) ?? str(r.body) ?? '',
  image: mediaUrl(r.image),
})

const toJob = (r: Row): Job => ({ title: str(r.title) ?? '', body: str(r.description) ?? '', location: str(r.location), type: str(r.type) })

function toClient(r: Row): Client {
  const name = str(r.name) ?? ''
  const design = local.clients.find((c) => c.name === name) as Partial<Client> | undefined
  return {
    name,
    logo: mediaUrl(r.logo) ?? design?.logo ?? '',
    text: str(r.description) ?? '',
    w: design?.w ?? 120,
    h: design?.h ?? 40,
    logoOffset: design?.logoOffset,
    textOffset: design?.textOffset,
  }
}

function toTestimonial(r: Row): Testimonial {
  const name = str(r.name) ?? ''
  const design = local.testimonials.find((t) => t.name === name)
  return { name, avatar: mediaUrl(r.avatar) ?? design?.avatar ?? '', box: design?.box ?? { left: 0, top: 0, width: 50, height: 50 } }
}

export type CollectionKey = 'works' | 'news' | 'services' | 'jobs' | 'clients' | 'testimonials'
export type Source = 'wix' | 'local'

/**
 * Fetch every collection in parallel as a Wix visitor. Each collection falls back to the
 * local copy on its own (network error, auth failure, timeout, or an empty collection).
 */
export async function fetchContent(timeoutMs = 8000): Promise<{ content: Content; sources: Record<CollectionKey, Source>; errors: string[] }> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  const jobs = {
    works: queryCollection('Works', ctrl.signal).then((rows) => rows.map(toWork)),
    news: queryCollection('News', ctrl.signal).then((rows) => rows.map(toNews)),
    services: queryCollection('Services', ctrl.signal).then((rows) => rows.map(toService)),
    jobs: queryCollection('Careers', ctrl.signal).then((rows) => rows.map(toJob)),
    clients: queryCollection('Clients', ctrl.signal).then((rows) => rows.map(toClient)),
    testimonials: queryCollection('Testimonials', ctrl.signal).then((rows) => ({ rows, list: rows.map(toTestimonial) })),
  }
  const keys = Object.keys(jobs) as CollectionKey[]
  const settled = await Promise.allSettled(keys.map((k) => jobs[k]))
  clearTimeout(timer)

  const content: Content = { ...localContent }
  const sources = Object.fromEntries(keys.map((k) => [k, 'local'])) as Record<CollectionKey, Source>
  const errors: string[] = []
  settled.forEach((s, i) => {
    const k = keys[i]
    if (s.status === 'rejected') {
      errors.push(`${k}: ${String((s.reason as Error)?.message ?? s.reason)}`)
      return
    }
    if (k === 'testimonials') {
      const { rows, list } = s.value as { rows: Row[]; list: Testimonial[] }
      if (!list.length) return
      content.testimonials = list
      content.quote = str(rows[0]?.quote) ?? content.quote
    } else {
      const list = s.value as unknown[]
      if (!list.length) return
      ;(content as Record<CollectionKey, unknown>)[k] = list
    }
    sources[k] = 'wix'
  })
  return { content, sources, errors }
}
