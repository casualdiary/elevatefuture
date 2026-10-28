/** Content shared across pages (from the Figma "Interfaces" page). */

export type Placement = { left: number; top: number; width: number; height: number }
export type Work = {
  slug: string
  name: string
  tag: string
  bg?: string
  img?: string
  placement?: Placement
  logo?: boolean
  bands?: boolean
  category: 'Animation' | 'Motion Graphics' | 'Immersive Content'
}

// Image placement inside the 600×720 card, % of the card (from Figma mask offsets).
const hsbc = {
  bg: '#d2e4e6',
  img: '/assets/work-hsbc.png',
  placement: { left: -4 / 6, top: 24 / 7.2, width: 638 / 6, height: 902 / 7.2 },
  bands: true,
}

export const works: Work[] = [
  { slug: 'lazada', name: 'Lazada', tag: 'Marketing Campaign', bg: '#2e55e0', logo: true, category: 'Motion Graphics' },
  {
    slug: 'mandiri-bank', name: 'Mandiri Bank', tag: 'Marketing Campaign', category: 'Immersive Content',
    img: '/assets/work-mandiri.png',
    placement: { left: -20 / 6, top: -11 / 7.2, width: 1061 / 6, height: 735 / 7.2 },
  },
  {
    slug: 'gojek', name: 'Gojek', tag: 'Marketing Campaign', category: 'Animation',
    img: '/assets/work-gojek.png',
    placement: { left: -42 / 6, top: -214 / 7.2, width: 662 / 6, height: 936 / 7.2 },
  },
  { slug: 'hsbc', name: 'HSBC', tag: 'Marketing Campaign', category: 'Motion Graphics', ...hsbc },
  { slug: 'hsbc-water', name: 'HSBC', tag: 'Marketing Campaign', category: 'Immersive Content', ...hsbc },
  { slug: 'hsbc-trade', name: 'HSBC', tag: 'Marketing Campaign', category: 'Animation', ...hsbc },
]

export type NewsItem = {
  slug: string
  title: string
  body: string
  img: string
  alt: string
  category: 'Insights' | 'Journal' | 'Awards'
  date: string
  author: string
}

export const news: NewsItem[] = [
  {
    slug: 'metaverse-is-still-a-thing',
    title: 'Metaverse is Still a Thing?',
    body: 'A Qlik study of C-suite executives titled "Data Literacy: The Upskilling Evolution" found that over 99% of them will hire new roles in the next decade, including chief metaverse officer.',
    img: '/assets/news-2.png',
    alt: 'Animated characters in a colourful virtual world',
    category: 'Insights',
    date: '23 May 2023',
    author: 'Dion',
  },
  {
    slug: 'animation-vs-live-action',
    title: 'Animation vs. Live Action',
    body: 'In 2023, it will be impossible to deny the power of video marketing.',
    img: '/assets/news-3.png',
    alt: 'Animator presenting a storyboard wall',
    category: 'Journal',
    date: '12 Apr 2023',
    author: 'Dion',
  },
  {
    slug: 'thrive-in-a-post-pandemic-creative-industry',
    title: 'Thrive in a Post-pandemic Creative Industry',
    body: 'Much has changed for the ad industry since the world—and along with it, the global economy—was turned upside down in 2020.',
    img: '/assets/news-1.png',
    alt: 'Large studio team photo',
    category: 'Awards',
    date: '02 Feb 2023',
    author: 'Dion',
  },
]

export const serviceItems = [
  {
    slug: 'illustration',
    title: 'Illustration',
    body: 'Its ability to evoke emotions and convey messages in a visually compelling way makes animation a versatile tool for storytelling. Whether aiming to entertain, educate, or advocate, the influence of animation extends beyond mere visuals, creating a profound and lasting impact on its audience.',
  },
  { slug: 'campaign-identity', title: 'Campaign Identity', body: 'From typography and logo systems to mascots and 3D graphics, we build campaign identities that travel across markets and platforms.' },
  { slug: 'experiental-marketing', title: 'Experiental Marketing', body: 'Installations, activations and live moments that let audiences step inside a brand story.' },
  { slug: 'brand-video', title: 'Brand Video', body: 'Story-led films, explainers and social cut-downs crafted end to end — script, boards, animation and sound.' },
  { slug: 'virtual-experience', title: 'Virtual Experience', body: 'Immersive and interactive worlds for the web, XR and events that keep audiences exploring.' },
]

export const jobs = [
  {
    title: 'Head of Technology',
    body: 'We are looking for a fantastic developer and natural leader to help us define the next generation of digital experiences and reshape a dream team of developers.',
  },
  { title: 'Illustrator', body: 'Bring characters, worlds and campaigns to life with a distinctive hand and a love for motion.' },
  { title: 'Business Analyst', body: 'Turn client goals into clear briefs, timelines and measurable outcomes for our production teams.' },
  { title: 'Videographer', body: 'Shoot and direct live-action footage that blends seamlessly with our animation and 3D work.' },
  { title: 'Sound Engineer', body: 'Design, mix and master sound that makes every frame land — from TVCs to immersive installations.' },
]

export const clients = [
  {
    logo: '/assets/logo-f1.svg', name: 'Formula 1', w: 107.997, h: 27,
    text: 'Pinnacle of speed, precision, and innovation in motorsports, uniting global audiences with thrilling races and cutting-edge technology.',
  },
  {
    logo: '/assets/logo-lazada.svg', name: 'Lazada', w: 166.534, h: 34.9997,
    text: 'Lazada Group is an international e-commerce company and one of the largest e-commerce operators in Southeast Asia.',
  },
  {
    logo: '/assets/logo-mcdonalds.svg', name: "McDonald's", w: 45.7844, h: 40, logoOffset: 19.25,
    text: "McDonald's is the world's largest fast food restaurant chain, serving over 69 million customers daily in over 100 countries",
  },
  {
    logo: '/assets/logo-mtv.svg', name: 'MTV', w: 70.5, h: 47, textOffset: 7.5,
    text: "MTV is the best place to watch original series, and stay up to date on today's celebrity news and music.",
  },
  {
    logo: '/assets/logo-grab.svg', name: 'Grab', w: 90.8744, h: 35,
    text: "Grab is Southeast Asia's leading superapp. It provides everyday services like Deliveries, Mobility, Financial Services, and More.",
  },
  {
    logo: '/assets/logo-hsbc.svg', name: 'HSBC', w: 148.484, h: 40,
    text: "HSBC is one of the world's largest banking and financial services organisations. We serve approximately 39 million customers",
  },
] as const

export const testimonials = [
  { name: 'Zuck, CEO of Meta', avatar: '/assets/testimonial-1.png', box: { left: 0, top: 0, width: 50, height: 50 } },
  { name: 'Johny Ive, Head of Design at Apple', avatar: '/assets/testimonial-2.png', box: { left: -22, top: -1, width: 93, height: 52 } },
  { name: 'Dylan Field, CEO of Figma', avatar: '/assets/testimonial-3.png', box: { left: -36, top: -6, width: 126, height: 106 } },
]
export const quote = 'Thank you for putting us into the right direction from the start of planning to the execution of the project.'

export const team = [
  { name: 'John Doe', role: 'CEO' },
  { name: 'John Doe', role: 'Staff' },
  { name: 'John Doe', role: 'Staff' },
  { name: 'John Doe', role: 'Staff', wide: true },
  { name: 'John Doe', role: 'Staff' },
  { name: 'John Doe', role: 'Staff' },
  { name: 'John Doe', role: 'Staff' },
  { name: 'John Doe', role: 'Staff' },
  { name: 'John Doe', role: 'Staff', wide: true },
  { name: 'John Doe', role: 'Staff' },
]

export const navLinks = [
  { label: 'Solutions', to: '/#solutions' },
  { label: 'Works', to: '/works' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'News', to: '/news' },
] as const
