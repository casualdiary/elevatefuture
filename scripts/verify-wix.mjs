// Verifies the pages read their content from the Wix CMS at runtime, and fall back to the
// bundled copy when Wix is unreachable. Usage: npm run build && npm run preview, then
// `node scripts/verify-wix.mjs`.
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const routes = ['/', '/works', '/works/gojek', '/news', '/news/metaverse-is-still-a-thing', '/services', '/services/brand-video', '/careers', '/contact', '/about']
const browser = await chromium.launch()
let failures = 0
const check = (ok, msg) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`)
  if (!ok) failures++
}

async function visit(path, { blockWix = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  await ctx.addInitScript(() => sessionStorage.setItem('elevate-loaded', '1'))
  if (blockWix) await ctx.route('https://www.wixapis.com/**', (r) => r.abort())
  const page = await ctx.newPage()
  const calls = []
  const media = []
  page.on('response', (res) => {
    const u = res.url()
    if (u.startsWith('https://www.wixapis.com/')) calls.push({ path: new URL(u).pathname, status: res.status(), body: res.request().postData() })
    if (u.startsWith('https://static.wixstatic.com/')) media.push(res.status())
  })
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForFunction(() => document.documentElement.dataset.content && document.documentElement.dataset.content !== 'loading', null, { timeout: 15000 })
  const status = await page.evaluate(() => document.documentElement.dataset.content)
  // scroll through so lazy images load
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) }
  })
  await page.waitForTimeout(600)
  const imgs = await page.$$eval('img', (els) => els.map((e) => e.currentSrc || e.src).filter((s) => s.includes('wixstatic.com')))
  await ctx.close()
  return { status, calls, media, imgs }
}

for (const r of routes) {
  const { status, calls, media, imgs } = await visit(r)
  const queries = calls.filter((c) => c.path === '/wix-data/v2/items/query')
  const collections = queries.map((q) => JSON.parse(q.body).dataCollectionId)
  const okQueries = queries.filter((q) => q.status === 200).length
  const token = calls.find((c) => c.path === '/oauth2/token')
  check(
    status === 'wix' && token?.status === 200 && okQueries === 6,
    `${r.padEnd(34)} content=${status} token=${token?.status} queries=${okQueries}/6 [${collections.join(',')}] wixstatic imgs on page=${imgs.length} (media responses ok=${media.filter((s) => s < 400).length}/${media.length})`,
  )
}

const fb = await visit('/works', { blockWix: true })
check(fb.status === 'local' && fb.imgs.length === 0, `/works with wixapis.com blocked -> content=${fb.status}, renders local assets (wixstatic imgs=${fb.imgs.length})`)

await browser.close()
console.log(failures ? `${failures} failure(s)` : 'all checks passed')
process.exit(failures ? 1 : 0)
