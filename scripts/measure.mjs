// Print document Y of elements whose text matches given strings (desktop 1440).
import { chromium } from 'playwright'
const [path, ...texts] = process.argv.slice(2)
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 1024 } })
await ctx.addInitScript(() => sessionStorage.setItem('elevate-loaded', '1'))
const p = await ctx.newPage()
await p.goto('http://localhost:4173' + path, { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
const h = await p.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < h; y += 600) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(80) }
await p.waitForTimeout(1000)
const out = await p.evaluate((texts) => texts.map((t) => {
  const els = [...document.querySelectorAll('body *')].filter((e) => e.childElementCount === 0 || [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
  const el = els.find((e) => e.textContent.trim().startsWith(t) && e.offsetParent !== null && !e.closest('.sr-only'))
  if (!el) return `${t}: -`
  const r = el.getBoundingClientRect()
  return `${t}: top ${Math.round(r.top + scrollY)} left ${Math.round(r.left)} w ${Math.round(r.width)} h ${Math.round(r.height)}`
}), texts)
console.log(out.join('\n'), '\npage height', h)
await b.close()
