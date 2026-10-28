// Renders the raw Figma design-context code (design/*.txt via /workspace/figma-ref) at 1440 as a reference image.
import { chromium } from 'playwright'
const map = {
  works: 'works', 'work-detail': 'work-detail', about: 'about', news: 'news', 'news-detail': 'news-detail',
  services: 'services', 'service-detail': 'service-detail', contact: 'contact', 'contact-book': 'contact-book',
  careers: 'careers', 'home-banner-yeezy': 'banner-bg1', 'home-banner-adidas': 'banner-bg2', 'home-banner-bmw': 'banner-alt',
}
// frame heights at 1440 (footnote top + 50 from the design code; banners are 1024)
const heights = { works: 4903, 'work-detail': 5716, about: 6875, news: 3541, 'news-detail': 4424, services: 5515, 'service-detail': 6629, contact: 2811, 'contact-book': 2923, careers: 3631 }
const only = process.argv.slice(2)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
for (const [name, f] of Object.entries(map)) {
  if (only.length && !only.includes(name)) continue
  await p.goto(`http://localhost:5180/?f=${f}`, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(800)
  const h = await p.evaluate(() => {
    const root = document.querySelector('#frame > div')
    let m = 0
    for (const el of root.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.width > 1200 && r.height > 0) m = Math.max(m, r.bottom)
    }
    return Math.ceil(m)
  })
  const H = heights[name] ?? 1024
  await p.screenshot({ path: `screenshots/${name}-figma.png`, clip: { x: 0, y: 0, width: 1440, height: H }, fullPage: true })
  console.log(name, h)
}
await b.close()
