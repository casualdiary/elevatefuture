// Full-page screenshots of every route at 1440 and 375 (and 768 for home).
// Usage: npm run preview (port 4173) then `node scripts/screenshot.mjs [pageName...]`
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:4173'
export const pages = {
  home: '/',
  'home-banner-yeezy': '/?hero=carousel&slide=0',
  'home-banner-adidas': '/?hero=carousel&slide=1',
  'home-banner-bmw': '/?hero=carousel&slide=2',
  works: '/works',
  'work-detail': '/works/lazada',
  about: '/about',
  news: '/news',
  'news-detail': '/news/metaverse-is-still-a-thing',
  services: '/services',
  'service-detail': '/services/campaign-identity',
  contact: '/contact',
  'contact-book': '/contact/book',
  careers: '/careers',
}
const viewports = { 'desktop-1440': { width: 1440, height: 1024 }, 'mobile-375': { width: 375, height: 812 } }

const only = process.argv.slice(2)
const browser = await chromium.launch()
for (const [name, path] of Object.entries(pages)) {
  if (only.length && !only.includes(name)) continue
  for (const [vp, size] of Object.entries(viewports)) {
    const banner = name.startsWith('home-banner')
    const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1 })
    // skip the preloader: mark the session as already loaded
    await ctx.addInitScript(() => sessionStorage.setItem('elevate-loaded', '1'))
    const page = await ctx.newPage()
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1300)
    if (!banner) {
      // scroll through so whileInView reveals fire
      const h = await page.evaluate(() => document.body.scrollHeight)
      for (let y = 0; y < h; y += Math.round(size.height * 0.6)) {
        await page.evaluate((v) => window.scrollTo(0, v), y)
        await page.waitForTimeout(120)
      }
      await page.waitForTimeout(900)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(600)
    } else {
      // pause autoplay by hovering the stage
      await page.mouse.move(size.width / 2, size.height * 0.45)
      await page.waitForTimeout(1500)
    }
    await page.screenshot({ path: `screenshots/${name}-${vp}.png`, fullPage: !banner })
    console.log('saved', name, vp)
    await ctx.close()
  }
}
await browser.close()
