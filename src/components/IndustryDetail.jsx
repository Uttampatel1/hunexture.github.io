import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getIndustryBySlug, industriesData, getTechIcon } from '../data/industriesData'
import { industryMeta } from '../data/insights'
import { industryExtra } from '../data/industryExtra'
import IndustryArtifact from './IndustryArtifact'
import './PageKit.css'
import './IndustryDetail.css'
import BrandTitle from './BrandMark'
import './brand.css'


const IndustryDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(0)

  const industry = getIndustryBySlug(slug)
  const meta = industryMeta[slug]
  const extra = industryExtra[slug]

  useEffect(() => { setOpenFaq(0) }, [slug])

  if (!industry || !meta || !extra) {
    return (
      <main className="theme-ind pk-main idt-missing">
        <h1>Industry not found</h1>
        <p>We could not find that sector. Browse all sectors instead.</p>
        <Link className="pk-btn pk-btn--primary brand-btn-primary" to="/industries">All industries</Link>
      </main>
    )
  }

  const Icon = industry.icon
  const related = industriesData
    .filter((i) => i.slug !== slug && industryMeta[i.slug]?.cluster === meta.cluster)
    .slice(0, 4)

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main className="theme-ind pk-main">
      <header className="pk-hero" aria-labelledby="idt-title">
        <div className="pk-hero-inner">
          <div className="pk-hero-copy">
            <nav className="pk-eyebrow pk-crumbs" aria-label="Breadcrumb">
              <Link to="/industries" className="brand-link">Industries</Link><span aria-hidden="true">/</span><span>{industry.name}</span>
            </nav>
            <span className="pk-icon-lg" aria-hidden="true"><Icon /></span>
            <h1 id="idt-title" className="pk-title brand-title brand-fade-up"><BrandTitle text={`${industry.name} software built around your requirements`} /></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">{extra.intro}</p>
            <ul className="pk-tags idt-regs" aria-label="Standards we design for">
              {meta.regs.map((r) => <li key={r}>{r}</li>)}
            </ul>
            <div className="pk-actions brand-fade-up brand-delay-2">
              <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Talk to us about {industry.name.toLowerCase()}</button>
              <a className="pk-btn" href="#build">See what we build</a>
            </div>
          </div>

          <IndustryArtifact slug={slug} Icon={Icon} name={industry.name} />
        </div>
        <div className="pk-wrap">
          <ul className="idt-stats brand-fade-up brand-delay-3">
            {industry.stats.map((s) => (
              <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>
            ))}
          </ul>
        </div>
      </header>

      <section className="pk-section pk-section--sunk" aria-labelledby="idt-needs">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="idt-needs">What {industry.name.toLowerCase()} teams need now</h2>
            <p>{meta.demand}</p>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {extra.needs.map((n, i) => (
              <li key={n.t}>
                <div className="pk-tile"><h3>{n.t}</h3><p>{n.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="build" className="pk-section" aria-labelledby="idt-build">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="idt-build">What we build</h2>
            <p>{industry.description}</p>
          </div>
          <ul className="pk-grid idt-services" data-reveal data-reveal-stagger>
            {industry.services.map((s, i) => {
              const SIcon = s.icon
              return (
                <li key={s.name}>
                  <div className="pk-tile">
                    <span className="pk-icon" aria-hidden="true"><SIcon /></span>
                    <span>{s.name}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="idt-ai" data-reveal>
            <h3>Where AI helps</h3>
            <ul>
              {extra.ai.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <Link to="/ai" className="idt-link brand-link">Explore our AI work</Link>
          </div>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="idt-rules">
        <div className="pk-wrap pk-split">
          <div data-reveal>
            <h2 id="idt-rules">Rules we design for</h2>
            <p className="pk-split-text">
              Compliance is a design input, not a final check. These are the requirements we plan for
              in discovery. Your legal team still decides what applies to you.
            </p>
          </div>
          <dl className="idt-rules" data-reveal data-reveal-delay="1">
            {extra.compliance.map((c) => (
              <div key={c.t}><dt>{c.t}</dt><dd>{c.d}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="idt-how">
        <div className="pk-wrap pk-duo">
          <div data-reveal>
            <h2 id="idt-how">How we work</h2>
            <ol className="idt-steps">
              {industry.process.map((s, i) => (
                <li key={s.title}>
                  <span className="pk-num" aria-hidden="true">{i + 1}</span>
                  <div><h3>{s.title}</h3><p>{s.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal data-reveal-delay="1">
            <h2>What to measure</h2>
            <p className="pk-split-text">We agree these before building, so progress is a number and not an opinion.</p>
            <ul className="pk-list idt-kpis">
              {extra.kpis.map((k) => <li key={k}>{k}</li>)}
            </ul>
            <h3 className="idt-sub">Common challenges</h3>
            <ul className="idt-plain">
              {industry.challenges.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {industry.caseStudies?.length > 0 && (
        <section className="pk-section pk-section--sunk" aria-labelledby="idt-ex">
          <div className="pk-wrap">
            <div className="pk-head" data-reveal>
              <h2 id="idt-ex">Example scenarios</h2>
              <p>Typical builds in this sector. They are examples of scope, not client results.</p>
            </div>
            <ul className="pk-grid idt-cases" data-reveal data-reveal-stagger>
              {industry.caseStudies.map((c, i) => (
                <li key={c.title}>
                  <div className="pk-tile"><h3>{c.title}</h3><p>{c.description}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pk-section" aria-labelledby="idt-tech">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="idt-tech">Technology</h2>
            <p>Mainstream, well-supported tools that your own team can hire for and maintain.</p>
          </div>
          <ul className="idt-tech" data-reveal data-reveal-delay="1">
            {industry.technologies.map((t) => {
              const TIcon = getTechIcon(t)
              return <li key={t}><TIcon aria-hidden="true" />{t}</li>
            })}
          </ul>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="idt-faq">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="idt-faq">Questions about {industry.name.toLowerCase()} projects</h2>
          </div>
          <div className="pk-acc pk-acc-narrow" data-reveal data-reveal-delay="1">
            {extra.faq.map((f, i) => (
              <div key={f.q} className={`pk-acc-item${openFaq === i ? ' is-open' : ''}`}>
                <h3>
                  <button type="button" className="pk-acc-btn" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="pk-acc-title">{f.q}</span><span className="pk-chev" aria-hidden="true" />
                  </button>
                </h3>
                <div className="pk-acc-panel"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pk-section" aria-labelledby="idt-related">
          <div className="pk-wrap">
            <div className="pk-head pk-head--solo" data-reveal>
              <h2 id="idt-related">Related sectors</h2>
            </div>
            <ul className="pk-grid pk-grid--4 idt-related" data-reveal data-reveal-stagger>
              {related.map((r, i) => {
                const RIcon = r.icon
                return (
                  <li key={r.slug}>
                    <Link to={`/industries/${r.slug}`} className="pk-card brand-card"><RIcon aria-hidden="true" /><span>{r.name}</span></Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Planning a {industry.name.toLowerCase()} product?</h2>
              <p>Tell us the goal and the rules you work under. We reply within one business day.</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default IndustryDetail
