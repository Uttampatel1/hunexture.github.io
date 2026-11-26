// Post-build SEO step for the GitHub Pages SPA.
//  1. Writes build/<route>/index.html for every route, with route-specific <head> tags,
//     so crawlers get a 200 response and correct metadata without running JS
//     (GitHub Pages otherwise serves the 404.html redirect for deep links).
//  2. Generates sitemap.xml and points robots.txt at it.
// Run automatically via the "postbuild" npm script.
require('sucrase/register')

const fs = require('fs')
const path = require('path')

const buildDir = path.join(__dirname, '..', 'build')
const { getAllSeoPages, getSeoForPath, buildJsonLd } = require('../src/seo/seoMeta')
const { SITE_URL, contactDetails } = require('../src/data/companyData')
const { getFacts, buildOrganizationLd } = require('../src/data/facts')
const { buildDoc } = require('./siteContent')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Regenerate the Organization JSON-LD from data so it can never drift from companyData/services.
const template = fs
  .readFileSync(path.join(buildDir, 'index.html'), 'utf8')
  .replace(/<script type="application\/ld\+json">\s*\{[^<]*?"#organization"|<script type="application\/ld\+json">(?=[^<]*#organization)[^<]*<\/script>/, () => `<script type="application/ld+json">${JSON.stringify(buildOrganizationLd())}</script>`)

const setTag = (html, regex, replacement) => (regex.test(html) ? html.replace(regex, replacement) : html)

const inline = (it) => (typeof it === 'string' ? esc(it) : `${it.b ? `<strong>${esc(it.b)}</strong>${it.t ? ': ' : ''}` : ''}${it.href ? `<a href="${esc(it.href)}">${esc(it.t || it.b)}</a>` : esc(it.t || '')}`)
const htmlBlocks = (blocks) =>
  blocks
    .map((b) => {
      if (b.t === 'h2' || b.t === 'h3') return `<${b.t}>${esc(b.x)}</${b.t}>`
      if (b.t === 'p') return `<p>${esc(b.x)}</p>`
      if (b.t === 'ul') return `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`
      return ''
    })
    .join('')

const mdInline = (it) => {
  if (typeof it === 'string') return it
  const bold = it.b ? `**${it.b}**` : ''
  const text = it.href ? `[${it.t || it.b}](${it.href})` : it.t || ''
  return it.b && it.href ? `**[${it.b}](${it.href})**${it.t ? ': ' + it.t : ''}` : [bold, text].filter(Boolean).join(': ')
}
const mdBlocks = (blocks, shift = 0) =>
  blocks
    .map((b) => {
      if (b.t === 'h2') return `${'#'.repeat(2 + shift)} ${b.x}`
      if (b.t === 'h3') return `${'#'.repeat(3 + shift)} ${b.x}`
      if (b.t === 'p') return b.x
      if (b.t === 'ul') return b.items.map((i) => `- ${mdInline(i)}`).join('\n')
      return ''
    })
    .filter(Boolean)
    .join('\n\n')

const render = (seo, links) => {
  let html = template
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${seo.url}" />`)
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(seo.title)}" />`)
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`)
  html = setTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`)
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${seo.url}" />`)

  const ld = `<script type="application/ld+json" data-route-ld>${JSON.stringify(buildJsonLd(seo))}</script>`
  html = html.replace('</head>', `${ld}</head>`)

  const nav = links
    .map((l) => `<li><a href="${l.path}">${esc(l.label)}</a></li>`)
    .join('')
  const body = htmlBlocks(buildDoc(seo), 2)
  const fallback =
    `<noscript><main><h1>${esc(seo.h1)}</h1><p>${esc(seo.description)}</p>${body}` +
    `<nav aria-label="Site"><ul>${nav}</ul></nav></main></noscript>`
  const bodyAt = html.indexOf('<body')
  html = html.slice(0, bodyAt) + html.slice(bodyAt).replace(/<noscript>[\s\S]*?<\/noscript>/, fallback)
  return html
}

const mainLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/ai', label: 'AI & Machine Learning' },
  { path: '/industries', label: 'Industries' },
  { path: '/lab', label: 'Interactive AI lab' },
  { path: '/insights', label: 'Insights' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/business-profile', label: 'Business profile' },
]

const pages = getAllSeoPages()
const pageMarkdown = (seo, shift = 0) =>
  `${'#'.repeat(1 + shift)} ${seo.h1}\n\n> ${seo.description}\n\nCanonical URL: ${seo.url}\n\n${mdBlocks(buildDoc(seo), shift)}\n`
const routes = Object.keys(pages)

routes.forEach((route) => {
  const seo = getSeoForPath(route)
  const html = render(seo, mainLinks)
  const out = route === '/' ? path.join(buildDir, 'index.html') : path.join(buildDir, route, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  fs.writeFileSync(path.join(path.dirname(out), 'index.md'), pageMarkdown(seo))
})

// sitemap.xml
const today = new Date().toISOString().slice(0, 10)
const priority = (r) => (r === '/' ? '1.0' : r.split('/').length === 2 ? '0.8' : '0.6')
const legal = new Set(['/privacy-policy', '/terms-of-service', '/cookie-policy'])
const urls = routes
  .map((r) => {
    const loc = r === '/' ? `${SITE_URL}/` : `${SITE_URL}${r}/`
    const p = legal.has(r) ? '0.2' : priority(r)
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`
  })
  .join('\n')
fs.writeFileSync(
  path.join(buildDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
)

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot']
fs.writeFileSync(
  path.join(buildDir, 'robots.txt'),
  `# Hunexture welcomes search and AI crawlers.\n# Plain-language site summary for LLMs: ${SITE_URL}/llms.txt (full content: ${SITE_URL}/llms-full.txt)\n\nUser-agent: *\nAllow: /\n\n` +
    aiBots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n') +
    `\nSitemap: ${SITE_URL}/sitemap.xml\n`
)

// llms.txt (llmstxt.org format): summary plus links to Markdown copies of each page.
const md = (r) => `${SITE_URL}${r === '/' ? '' : r}/index.md`
const entry = (r) => `- [${pages[r].h1}](${md(r)}): ${pages[r].description}`
const group = (title, prefix, extra = []) => {
  const rows = [...extra, ...routes.filter((r) => r.startsWith(prefix))]
  return rows.length ? `\n## ${title}\n${rows.map((r) => entry(r)).join('\n')}\n` : ''
}
const facts = getFacts()
const llms =
  `# Hunexture\n\n> ${pages['/'].description} Contact: ${contactDetails.email}, ${contactDetails.location}.\n\n` +
  `Hunexture offers ${facts.services.map((s) => s.name).join(', ')}. Pages below are available as Markdown (.md); the whole site is in one file at ${SITE_URL}/llms-full.txt.\n` +
  `\n## Company\n- [Home](${md('/')}): ${pages['/'].description}\n- [Company facts](${md('/about/facts')}): ${pages['/about/facts'].description}\n- [Business profile](${md('/business-profile')}): ${pages['/business-profile'].description}\n- [Full site content](${SITE_URL}/llms-full.txt): Every page of this site as one Markdown document.\n` +
  group('Services', '/services/', ['/services']) +
  group('AI & machine learning', '/ai/', ['/ai']) +
  group('Industries', '/industries/', ['/industries']) +
  group('Insights', '/insights/', ['/insights']) +
  group('Interactive lab', '/lab/', ['/lab']) +
  group('Optional', '/portfolio/', ['/portfolio', '/privacy-policy', '/terms-of-service', '/cookie-policy'])
fs.writeFileSync(path.join(buildDir, 'llms.txt'), llms)

// llms-full.txt: the whole site as one Markdown document (legal pages excluded).
const fullRoutes = routes.filter((r) => !legal.has(r) && r !== '/business-profile')
const full =
  `# Hunexture: full site content\n\n> ${pages['/'].description}\n\nSource: ${SITE_URL}/ (generated ${today}). Portfolio metrics and insight examples are illustrative, not verified client results.\n\n` +
  fullRoutes.map((r) => pageMarkdown(getSeoForPath(r), 1)).join('\n---\n\n')
fs.writeFileSync(path.join(buildDir, 'llms-full.txt'), full)

console.log(`SEO: prerendered ${routes.length} routes, wrote sitemap.xml, robots.txt, llms.txt, llms-full.txt and per-route index.md`)
