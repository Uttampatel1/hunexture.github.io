import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { portfolioData } from '../data/portfolioData'
import { portfolioProcess, portfolioTech } from '../data/insights'
import CoverArt from './CoverArt'
import './PageKit.css'
import './PortfolioPage.css'
import './brand.css'


const FILTERS = [
  { id: 'all', label: 'All projects' },
  { id: 'ai', label: 'AI' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'marketing', label: 'Marketing' },
]

const PortfolioPage = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const c = { all: portfolioData.length }
    portfolioData.forEach((p) => { c[p.category] = (c[p.category] || 0) + 1 })
    return c
  }, [])

  const list = filter === 'all' ? portfolioData : portfolioData.filter((p) => p.category === filter)
  const [featured, ...rest] = list

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main className="theme-pf pk-main">
      <header className="pk-hero" aria-labelledby="pfp-title">
        <div className="pk-hero-inner">
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">Portfolio</p>
            <h1 id="pfp-title" className="pk-title brand-title brand-fade-up">Projects built the way we would build <span className="brand-mark">yours</span></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">
              Concept and sample builds across AI, web, mobile, cloud and marketing. Each one shows the problem,
              the architecture and the decisions behind it. Metrics are illustrative; client case studies are
              published only with written permission.
            </p>
            <dl className="pk-facts brand-fade-up brand-delay-2">
              <div><dt data-count>{portfolioData.length}</dt><dd>sample builds</dd></div>
              <div><dt data-count>{Object.keys(counts).length - 1}</dt><dd>disciplines</dd></div>
              <div><dt>2 weeks</dt><dd>sprint length</dd></div>
            </dl>
          </div>
          <div className="pfp-hero-art brand-fade-up brand-delay-3" aria-hidden="true">
            {['ai', 'web', 'mobile'].map((cat, i) => (
              <div key={cat} className={`pfp-stack pfp-stack--${i + 1}`}>
                <CoverArt category={cat} seed={i + 3} />
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="pk-section pk-section--sunk" aria-label="Projects">
        <div className="pk-wrap">
          <div className="pk-chips pfp-filters" role="group" aria-label="Filter projects by discipline" data-reveal>
            {FILTERS.filter((f) => counts[f.id]).map((f) => (
              <button
                key={f.id}
                type="button"
                className={`pk-chip${filter === f.id ? ' is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}<span className="pk-chip-n">{counts[f.id]}</span>
              </button>
            ))}
          </div>

          {featured && (
            <div className="pfp-feature-wrap" key={`f-${filter}`} data-reveal>
              <Link to={`/portfolio/${featured.slug}`} className="pk-card pfp-feature brand-card">
                <span className="pfp-feature-art"><CoverArt category={featured.category} seed={featured.id} /></span>
                <span className="pfp-feature-body">
                  <span className="pfp-tag">Featured · {featured.categoryLabel}</span>
                  <span className="pfp-feature-title">{featured.title}</span>
                  <span className="pfp-feature-desc">{featured.description}</span>
                  <span className="pfp-metrics">
                    {featured.results.slice(0, 3).map((r) => (
                      <span key={r.label} className="pfp-metric"><b>{r.metric}</b>{r.label}</span>
                    ))}
                  </span>
                  <span className="pk-card-more">Read the build</span>
                </span>
              </Link>
            </div>
          )}

          <ul className="pk-grid" key={`g-${filter}`} data-reveal data-reveal-stagger>
            {rest.map((p, i) => (
              <li key={p.id}>
                <Link to={`/portfolio/${p.slug}`} className="pk-card pfp-card brand-card">
                  <span className="pfp-card-art"><CoverArt category={p.category} seed={p.id} /></span>
                  <span className="pfp-card-body">
                    <span className="pfp-tag">{p.categoryLabel}</span>
                    <span className="pfp-card-title">{p.title}</span>
                    <span className="pfp-card-desc">{p.shortDescription}</span>
                    {p.results?.[0] && (
                      <span className="pfp-card-stat"><span className="brand-stat-chip"><b>{p.results[0].metric}</b>{p.results[0].label}</span></span>
                    )}
                    <span className="pfp-card-meta">{p.tags.slice(0, 4).join(' · ')}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="pfp-how">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="pfp-how">How every project runs</h2>
            <p>The same four stages whether it is a prototype or a platform, so you always know what happens next.</p>
          </div>
          <ol className="pk-steps" data-reveal data-reveal-stagger>
            {portfolioProcess.map((s, i) => (
              <li key={s.title} className="pk-step">
                <span className="pk-num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pfp-marquee-wrap" aria-label="Technologies we build with">
        <p className="pfp-marquee-label">Built with</p>
        <div className="pfp-marquee">
          <ul className="pfp-marquee-track">
            {[...portfolioTech, ...portfolioTech].map((t, i) => (
              <li key={`${t}-${i}`} aria-hidden={i >= portfolioTech.length}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Have something similar in mind?</h2>
              <p>Tell us the problem. We reply within one business day with questions, not a sales script.</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PortfolioPage
