import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { aiData } from '../data/aiData'
import { aiExtra } from '../data/aiExtra'
import { aiGovernance } from '../data/insights'
import AIArtifact from './AIArtifact'
import './PageKit.css'
import './AIDetail.css'
import BrandTitle from './BrandMark'
import './brand.css'


const AIDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [openOffer, setOpenOffer] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)

  const ai = aiData.find((a) => a.slug === slug)
  const extra = aiExtra[slug]

  useEffect(() => { setOpenOffer(0); setOpenFaq(0) }, [slug])

  if (!ai || !extra) {
    return (
      <main className="theme-ai pk-main aid-missing">
        <h1>AI service not found</h1>
        <p>We could not find that page. Browse all AI solutions instead.</p>
        <Link className="pk-btn pk-btn--primary brand-btn-primary" to="/ai">All AI solutions</Link>
      </main>
    )
  }

  const Icon = ai.icon
  const related = aiData.filter((a) => a.slug !== slug).slice(0, 4)

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main className="theme-ai pk-main">
      <header className="pk-hero" aria-labelledby="aid-title">
        <div className="pk-hero-inner">
          <div className="pk-hero-copy">
            <nav className="pk-eyebrow pk-crumbs" aria-label="Breadcrumb">
              <Link to="/ai" className="brand-link">AI</Link><span aria-hidden="true">/</span><span>{ai.name}</span>
            </nav>
            <span className="pk-icon-lg" aria-hidden="true"><Icon /></span>
            <h1 id="aid-title" className="pk-title brand-title brand-fade-up"><BrandTitle text={ai.name} /></h1>
            <p className="pk-subtitle brand-fade-up brand-delay-1">{ai.headline}</p>
            <p className="pk-lede brand-fade-up brand-delay-2">{ai.description}</p>
            <div className="pk-actions brand-fade-up brand-delay-3">
              <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Plan a pilot</button>
              <a className="pk-btn" href="#offers">See what we offer</a>
            </div>
          </div>

          <AIArtifact slug={slug} Icon={Icon} name={ai.name} />
        </div>
      </header>

      <section className="aid-outcome" aria-label="Outcome">
        <div className="pk-wrap" data-reveal>
          <p><strong>What you get.</strong> {extra.outcome}</p>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="aid-fit">
        <div className="pk-wrap pk-duo">
          <div data-reveal>
            <h2 id="aid-fit">Where it fits</h2>
            <ul className="pk-list aid-fit">
              {extra.bestFor.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
          <div data-reveal data-reveal-delay="1">
            <h2>What you receive</h2>
            <ul className="pk-list aid-fit aid-deliver">
              {extra.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {ai.whatWeOffer?.length > 0 && (
        <section id="offers" className="pk-section pk-section--sunk" aria-labelledby="aid-offers">
          <div className="pk-wrap">
            <div className="pk-head" data-reveal>
              <h2 id="aid-offers">What we offer</h2>
              <p>Open an offer to see the capabilities and the tools we typically use.</p>
            </div>
            <div className="pk-acc aid-offers" data-reveal data-reveal-delay="1">
              {ai.whatWeOffer.map((o, i) => (
                <div key={o.title} className={`pk-acc-item aid-offer${openOffer === i ? ' is-open' : ''}`}>
                  <h3>
                    <button type="button" className="pk-acc-btn" aria-expanded={openOffer === i} onClick={() => setOpenOffer(openOffer === i ? -1 : i)}>
                      <span className="aid-offer-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="pk-acc-title">{o.title}</span>
                      <span className="pk-chev" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="pk-acc-panel">
                    <div>
                      <p>{o.description}</p>
                      {o.features?.length > 0 && (
                        <ul className="aid-feats">
                          {o.features.map((f) => <li key={f.name}><strong>{f.name}</strong> {f.description}</li>)}
                        </ul>
                      )}
                      {o.technologies?.length > 0 && (
                        <ul className="pk-tags" aria-label="Typical tools">
                          {o.technologies.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pk-section" aria-labelledby="aid-risk">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="aid-risk">Risks and how we control them</h2>
            <p>Every AI project carries risk. We list it at the start and build the controls into the work.</p>
          </div>
          <div className="aid-table-wrap" data-reveal data-reveal-delay="1">
            <table className="aid-table">
              <thead><tr><th scope="col">Risk</th><th scope="col">Control</th></tr></thead>
              <tbody>
                {extra.risks.map((r) => (
                  <tr key={r.risk}><th scope="row">{r.risk}</th><td>{r.control}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="pk-grid pk-grid--4 aid-gov" aria-label="Frameworks we map to" data-reveal data-reveal-delay="2">
            {aiGovernance.map((g) => <li key={g.name}><div className="pk-tile aid-gov-tile"><strong>{g.name}</strong><span>{g.note}</span></div></li>)}
          </ul>
        </div>
      </section>

      {ai.technologiesSummary?.length > 0 && (
        <section className="pk-section pk-section--sunk" aria-labelledby="aid-tech">
          <div className="pk-wrap">
            <div className="pk-head" data-reveal>
              <h2 id="aid-tech">Tools by area</h2>
              <p>We choose by fit and cost. This is the typical toolbox, not a fixed list.</p>
            </div>
            <ul className="pk-grid aid-tech" data-reveal data-reveal-stagger>
              {ai.technologiesSummary.map((t, i) => (
                <li key={t.category}>
                  <div className="pk-tile"><strong>{t.category}</strong><span>{t.tech}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pk-section" aria-labelledby="aid-faq">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="aid-faq">Questions about {ai.name}</h2>
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

      <section className="pk-section pk-section--sunk" aria-labelledby="aid-more">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="aid-more">More AI solutions</h2>
          </div>
          <ul className="pk-grid pk-grid--4 aid-related" data-reveal data-reveal-stagger>
            {related.map((r, i) => {
              const RIcon = r.icon
              return (
                <li key={r.slug}>
                  <Link to={`/ai/${r.slug}`} className="pk-card brand-card"><RIcon aria-hidden="true" /><span>{r.name}</span></Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Start with a two-week pilot</h2>
              <p>Bring one process and some sample data. You leave with a prototype and a clear go or no-go.</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AIDetail
