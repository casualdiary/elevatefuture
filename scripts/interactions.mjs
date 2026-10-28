// Smoke-tests interactive behaviour across routes. Run against `npm run preview`.
import { chromium } from 'playwright'
const BASE = process.env.BASE ?? 'http://localhost:4173'
const b = await chromium.launch()
const ok = (c, m) => { console.log(c ? 'PASS' : 'FAIL', m); if (!c) process.exitCode = 1 }

const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } })
await ctx.addInitScript(() => sessionStorage.setItem('elevate-loaded', '1'))
const p = await ctx.newPage()
const errors = []
p.on('pageerror', (e) => errors.push(e.message))

await p.goto(BASE + '/', { waitUntil: 'networkidle' })
// header nav → routes
for (const [label, path] of [['Works', '/works'], ['Services', '/services'], ['About', '/about'], ['News', '/news']]) {
  await p.locator('header nav').getByRole('link', { name: label, exact: true }).click()
  await p.waitForURL('**' + path)
  await p.waitForTimeout(900)
  ok((await p.locator('h1').first().textContent()).includes(label === 'About' ? 'About us' : label), `nav ${label} → ${path}`)
}
await p.locator('header').getByRole('link', { name: 'Get a Consultation' }).click()
await p.waitForURL('**/contact'); ok(true, 'CTA → /contact')

// contact tabs (route tabs)
await p.waitForTimeout(900)
await p.getByRole('tab', { name: 'Book a calendar' }).click()
await p.waitForURL('**/contact/book'); await p.waitForTimeout(700)
ok(await p.getByAltText(/Calendar booking widget/).isVisible(), 'contact tab → /contact/book shows calendar')
await p.getByRole('tab', { name: 'Write us' }).click(); await p.waitForURL(/\/contact$/); await p.waitForTimeout(700)
await p.getByRole('button', { name: 'Animation', exact: true }).click()
ok((await p.getByRole('button', { name: 'Animation', exact: true }).getAttribute('aria-pressed')) === 'true', 'interest toggle')
await p.getByPlaceholder('Your name').fill('Test'); await p.getByPlaceholder('Your email address').fill('a@b.co'); await p.getByPlaceholder('Tell us about your project').fill('Hi')
await p.getByRole('button', { name: 'Submit' }).click(); await p.waitForTimeout(400)
ok(await p.getByRole('status').isVisible(), 'form submit shows confirmation')

// works filter + card → detail
await p.goto(BASE + '/works', { waitUntil: 'networkidle' }); await p.waitForTimeout(900)
await p.getByRole('button', { name: 'Animation', exact: true }).click(); await p.waitForTimeout(900)
const n = await p.locator('main a[href^="/works/"]').count()
ok(n === 2, `works filter Animation → ${n} cards`)
await p.locator('main a[href^="/works/"]').first().click(); await p.waitForURL('**/works/*'); await p.waitForTimeout(900)
ok(await p.getByText('The Challange').isVisible(), 'work card → detail page')
await p.getByRole('link', { name: 'Show me more' }).click(); await p.waitForTimeout(900)
ok(/\/works\//.test(p.url()), 'next project link')

// services accordion
await p.goto(BASE + '/services', { waitUntil: 'networkidle' }); await p.waitForTimeout(900)
const acc = p.getByRole('button', { name: 'Brand Video' })
await acc.scrollIntoViewIfNeeded(); await acc.click(); await p.waitForTimeout(700)
ok((await acc.getAttribute('aria-expanded')) === 'true', 'accordion opens')
ok((await p.getByRole('button', { name: 'Illustration' }).getAttribute('aria-expanded')) === 'false', 'accordion closes others')
await p.getByRole('link', { name: 'Find out more' }).click(); await p.waitForURL('**/services/brand-video'); ok(true, 'accordion link → service detail')

// news filter
await p.goto(BASE + '/news', { waitUntil: 'networkidle' }); await p.waitForTimeout(900)
await p.getByRole('button', { name: 'Journal' }).click(); await p.waitForTimeout(900)
ok((await p.locator('main a[href^="/news/"]').count()) === 1, 'news filter Journal')

// hero carousel
await p.goto(BASE + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800)
await p.getByRole('tab', { name: 'Show campaign carousel' }).click(); await p.waitForTimeout(1200)
ok(await p.getByText('Yeezy season 2').isVisible(), 'sneaker thumb → carousel')
await p.getByRole('button', { name: /Next slide/ }).click(); await p.waitForTimeout(1200)
ok(await p.getByText('Adidas new predator').isVisible(), 'carousel next')
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1200)
ok(await p.getByText('Launched new BMW X1').isVisible(), 'carousel keyboard')
await p.getByRole('tab', { name: 'Show cabin feature' }).click(); await p.waitForTimeout(1000)
ok(await p.getByText('Immersive Content').first().isVisible(), 'cabin thumb → photo hero')

// footer careers link
await p.locator('footer').getByRole('link', { name: 'Careers' }).click(); await p.waitForURL('**/careers'); await p.waitForTimeout(900)
ok(await p.getByText('Head of Technology').isVisible(), 'footer → careers')
ok(errors.length === 0, `no page errors ${errors.join('; ')}`)
await ctx.close()

// mobile menu
const m = await b.newContext({ viewport: { width: 375, height: 812 } })
await m.addInitScript(() => sessionStorage.setItem('elevate-loaded', '1'))
const mp = await m.newPage()
await mp.goto(BASE + '/', { waitUntil: 'networkidle' }); await mp.waitForTimeout(600)
await mp.getByRole('button', { name: /menu/i }).click(); await mp.waitForTimeout(800)
await mp.getByRole('link', { name: 'Careers' }).first().click(); await mp.waitForURL('**/careers'); await mp.waitForTimeout(600)
ok((await mp.locator('h1').first().textContent()).includes('Careers'), 'mobile menu → careers and closes')
await mp.screenshot({ path: 'screenshots/careers-mobile-375-after-menu.png' })
await m.close()

// reduced motion: no preloader, content visible immediately
const r = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const rp = await r.newPage()
await rp.goto(BASE + '/about', { waitUntil: 'networkidle' }); await rp.waitForTimeout(300)
ok(await rp.getByText('Since day one').isVisible(), 'reduced motion: content visible without waiting')
await r.close()
await b.close()
