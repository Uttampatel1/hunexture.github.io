// Builds a neutral block model (h2/h3/p/ul) for each route from the site's data files.
// prerender.js renders the same blocks to <noscript> HTML, per-route index.md and llms-full.txt,
// so crawlers that do not run JavaScript see the same content as visitors.
require('sucrase/register')
const { SITE_URL, contactDetails, homeFaqs } = require('../src/data/companyData')
const { getFacts } = require('../src/data/facts')
const { servicesData } = require('../src/data/servicesData')
const { aiData } = require('../src/data/aiData')
const { aiExtra } = require('../src/data/aiExtra')
const { industriesData } = require('../src/data/industriesData')
const { industryExtra } = require('../src/data/industryExtra')
const { portfolioData } = require('../src/data/portfolioData')
const { getAllBlogPosts } = require('../src/data/blogData')
const { articles, formatDate } = require('../src/data/articles')

const link = (path) => `${SITE_URL}${path}/`
const clean = (s) => String(s == null ? '' : s).trim()
const H2 = (x) => ({ t: 'h2', x })
const H3 = (x) => ({ t: 'h3', x })
const P = (x) => ({ t: 'p', x: clean(x) })
const UL = (items) => ({ t: 'ul', items: items.filter((i) => (typeof i === 'string' ? clean(i) : i && (i.t || i.b))) })

// Section helpers: push nothing when the data is missing.
const list = (title, items) => (items && items.length ? [H2(title), UL(items)] : [])
const para = (title, text) => (clean(text) ? [H2(title), P(text)] : [])
const faqs = (arr, q = 'question', a = 'answer') =>
  arr && arr.length ? [H2('Frequently asked questions'), ...arr.flatMap((f) => [H3(f[q]), P(f[a])])] : []
const named = (arr) => (arr || []).map((x) => (typeof x === 'string' ? x : { b: x.name || x.title || x.t, t: x.description || x.d || '' }))
const steps = (arr) => (arr || []).map((x) => ({ b: `${x.step ? x.step + '. ' : ''}${x.title}`, t: x.description }))
const contactBlocks = () => [
  H2('Contact'),
  UL([
    { b: 'Email', t: contactDetails.email },
    { b: 'Phone / WhatsApp', t: contactDetails.phoneDisplay },
    { b: 'Location', t: contactDetails.location },
    { b: 'Website', t: SITE_URL, href: SITE_URL },
  ]),
]
const linkList = (arr) => arr.map((x) => ({ b: x.name, t: x.description, href: x.url }))

const factsBlocks = () => {
  const f = getFacts()
  return [
    H2('Who we are'),
    UL([
      { b: 'Name', t: f.name },
      { b: 'Type', t: 'Software, AI and web development company' },
      { b: 'Location', t: f.location },
      { b: 'Serves', t: 'Startups, SMEs and enterprises worldwide' },
      ...f.stats.map((s) => ({ b: s.label, t: `${s.value} (company-reported)` })),
      { b: 'Built on', t: f.stack.join(', ') },
    ]),
    H2('Services'),
    UL(linkList(f.services)),
    H2('AI and machine learning'),
    UL(linkList(f.ai)),
    H2('Industries'),
    UL(f.industries.map((i) => ({ t: i.name, href: i.url }))),
    H2('How we work'),
    UL(f.practices.map((p) => ({ b: p.title, t: p.description }))),
    ...f.start.flatMap((s) => [H3(s.question), P(s.answer)]),
    H2('Engagement models'),
    UL(f.engagementModels.map((m) => ({ b: m.name, t: `${m.howItWorks} Best for: ${m.bestFor}. Pricing basis: ${m.pricing}.` }))),
    H2('Security and confidentiality'),
    P(f.security),
    ...contactBlocks(),
    UL(f.social.map((s) => ({ b: s.name, t: s.url, href: s.url }))),
  ]
}

const service = (slug) => {
  const s = servicesData.find((x) => x.slug === slug)
  return [
    ...para('Overview', s.description),
    ...list('Key features', s.features),
    ...list('Benefits', s.benefits),
    ...list('How we work', steps(s.process)),
    ...list('Technologies', (s.technologies || []).map((t) => t.name)),
    ...list('Use cases', named(s.useCases)),
    ...faqs(s.faq),
  ]
}

const aiSolution = (slug) => {
  const a = aiData.find((x) => x.slug === slug)
  const x = aiExtra[slug] || {}
  const offers = (a.whatWeOffer || []).flatMap((o) => [
    H3(o.title),
    P(o.description),
    ...(o.features && o.features.length ? [UL(named(o.features))] : []),
    ...(o.technologies && o.technologies.length ? [P(`Technologies: ${o.technologies.join(', ')}`)] : []),
  ])
  return [
    ...para('Overview', [a.headline, a.description].filter(Boolean).join('. ').replace(/\.\./g, '.')),
    ...(offers.length ? [H2('What we offer'), ...offers] : []),
    ...list('Why Hunexture', named(a.whyChooseUs)),
    ...list('Technologies', (a.technologiesSummary || []).map((t) => ({ b: t.category, t: t.tech }))),
    ...para('Outcome', x.outcome),
    ...list('Best for', x.bestFor),
    ...list('Deliverables', x.deliverables),
    ...list('Delivery phases', (x.phases || []).map((p) => ({ b: `${p.phase} (${p.time})`, t: p.text }))),
    ...list('Risks and controls', (x.risks || []).map((r) => ({ b: r.risk, t: r.control }))),
    ...faqs(x.faq, 'q', 'a'),
  ]
}

const industry = (slug) => {
  const i = industriesData.find((x) => x.slug === slug)
  const x = industryExtra[slug] || {}
  return [
    ...para('Overview', i.description),
    ...para('Market context', x.intro),
    ...list('What buyers need', (x.needs || []).map((n) => ({ b: n.t, t: n.d }))),
    ...list('Services', named(i.services)),
    ...list('Benefits', i.benefits),
    ...list('Common challenges we solve', i.challenges),
    ...list('Compliance and standards', (x.compliance || []).map((c) => ({ b: c.t, t: c.d }))),
    ...list('How AI helps', x.ai),
    ...list('Outcomes we track', x.kpis),
    ...list('How we work', steps(i.process)),
    ...list('Why choose Hunexture', named(i.whyChooseUs)),
    ...list('Technologies', i.technologies),
    ...list('Example scenarios (illustrative, not client results)', (i.caseStudies || []).map((c) => ({ b: c.title, t: c.description }))),
    ...faqs(i.faq),
    ...faqs(x.faq, 'q', 'a').filter((b) => b.t !== 'h2'),
  ]
}

const portfolio = (slug) => {
  const p = portfolioData.find((x) => x.slug === slug)
  return [
    P('This is an illustrative example project. Any metrics shown on the site are illustrative, not verified client results.'),
    ...para('Overview', p.description || p.shortDescription),
    ...para('Challenge', p.challenge),
    ...para('Solution', p.solution),
    ...list('Features', p.features),
    ...list('Technologies', p.technologies),
  ]
}

const article = (slug) => {
  const a = articles.find((x) => x.slug === slug)
  return [
    P(`By Team Hunexture. ${a.category}. Published ${formatDate(a.date)}. ${a.readMinutes} minute read. Examples are illustrative, not client results.`),
    ...a.sections.flatMap((s) => [H2(s.heading), ...(s.paragraphs || []).map(P), ...(s.bullets && s.bullets.length ? [UL(s.bullets)] : [])]),
  ]
}

const labPost = (slug) => {
  const p = getAllBlogPosts().find((x) => x.slug === slug)
  return [
    ...para('About this explainer', p.description),
    ...list('Details', [{ b: 'Category', t: p.category }, p.tags && p.tags.length ? { b: 'Topics', t: p.tags.join(', ') } : null].filter(Boolean)),
  ]
}

const indexOf = (title, rows) => [H2(title), UL(rows)]

const buildDoc = (seo) => {
  const path = seo.path
  const seg = path.split('/').filter(Boolean)
  try {
    if (path === '/') {
      const f = getFacts()
      return [
        H2('What we do'),
        P(seo.description),
        ...list('Services', linkList(f.services)),
        ...list('AI and machine learning', linkList(f.ai)),
        ...list('Industries', f.industries.map((i) => ({ t: i.name, href: i.url }))),
        ...list('How we work', f.practices.map((p) => ({ b: p.title, t: p.description }))),
        ...list('Engagement models', f.engagementModels.map((m) => ({ b: m.name, t: `${m.howItWorks} Best for: ${m.bestFor}. Pricing basis: ${m.pricing}.` }))),
        ...list('Company at a glance', [
          { b: 'Company facts', t: 'Citable fact sheet', href: link('/about/facts') },
          ...f.stats.map((s) => ({ b: s.label, t: `${s.value} (company-reported)` })),
          { b: 'Built on', t: f.stack.join(', ') },
        ]),
        ...faqs(homeFaqs),
        ...contactBlocks(),
      ]
    }
    if (path === '/about/facts' || path === '/business-profile') return factsBlocks()
    if (path === '/services') return indexOf('Services', linkList(getFacts().services))
    if (path === '/ai') return indexOf('AI and machine learning solutions', linkList(getFacts().ai))
    if (path === '/industries') return indexOf('Industries', linkList(getFacts().industries))
    if (path === '/portfolio')
      return [P('Illustrative example projects. Metrics shown on the site are illustrative, not verified client results.'), UL(portfolioData.map((p) => ({ b: p.title, t: p.shortDescription, href: link(`/portfolio/${p.slug}`) })))]
    if (path === '/lab') return indexOf('Experiments', getAllBlogPosts().map((p) => ({ b: p.title, t: p.description, href: link(`/lab/${p.slug}`) })))
    if (path === '/insights')
      return indexOf('Articles', articles.map((a) => ({ b: a.title, t: a.description, href: link(`/insights/${a.slug}`) })))
    if (seg[0] === 'services' && seg[1]) return service(seg[1])
    if (seg[0] === 'ai' && seg[1]) return aiSolution(seg[1])
    if (seg[0] === 'industries' && seg[1]) return industry(seg[1])
    if (seg[0] === 'portfolio' && seg[1]) return portfolio(seg[1])
    if (seg[0] === 'insights' && seg[1]) return article(seg[1])
    if (seg[0] === 'lab' && seg[1]) return labPost(seg[1])
  } catch (e) {
    console.warn(`siteContent: fallback for ${path}: ${e.message}`)
  }
  return (seo.body || []).flatMap((sec) => [H2(sec.heading), UL(sec.items)]).concat(faqs(seo.faqs))
}

module.exports = { buildDoc, factsBlocks }
