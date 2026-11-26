import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { aiData } from '../data/aiData'
import { aiTrends, aiStackLayers, aiProcess, aiGovernance, aiFaq } from '../data/insights'
import './PageKit.css'
import './AIList.css'
import './brand.css'


/* Hero artifact: how a question travels through a retrieval-based assistant. */
const PipelineFigure = () => (
  <figure className="pk-fig al-fig">
    <svg viewBox="0 0 460 330" role="img" aria-label="Diagram: documents are indexed, a question retrieves passages, a model writes an answer with citations.">
      <g className="al-fig-docs">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${18 + i * 8} ${28 + i * 8})`}>
            <rect width="60" height="76" className="al-fig-box" />
            <line x1="10" y1="18" x2="48" y2="18" className="al-fig-rule" />
            <line x1="10" y1="30" x2="40" y2="30" className="al-fig-rule" />
            <line x1="10" y1="42" x2="46" y2="42" className="al-fig-rule" />
          </g>
        ))}
        <text x="18" y="140" className="al-fig-label">Your documents</text>
      </g>
      <path d="M100 82 H170" className="al-fig-link" />
      <path d="M100 82 H170" className="al-fig-packet" />

      <g transform="translate(170 40)">
        <ellipse cx="46" cy="14" rx="40" ry="12" className="al-fig-box" />
        <path d="M6 14 V70 a40 12 0 0 0 80 0 V14" className="al-fig-box al-fig-open" />
        <path d="M6 42 a40 12 0 0 0 80 0" className="al-fig-rule" />
        {[26, 46, 66].map((x, i) => <circle key={x} cx={x} cy={30 + (i % 2) * 22} r="3.5" className="al-fig-dot" style={{ animationDelay: `${i * 0.4}s` }} />)}
        <text x="0" y="100" className="al-fig-label">Search index</text>
      </g>

      <path d="M262 82 H318" className="al-fig-link" />
      <path d="M262 82 H318" className="al-fig-packet al-fig-packet--b" />

      <g transform="translate(318 34)">
        <rect width="124" height="96" className="al-fig-hot" />
        <circle cx="62" cy="38" r="16" className="al-fig-ring" />
        <circle cx="62" cy="38" r="5" className="al-fig-core" />
        <text x="0" y="116" className="al-fig-label">Language model</text>
      </g>

      <g transform="translate(18 206)">
        <rect width="424" height="96" className="al-fig-box" />
        <text x="16" y="26" className="al-fig-q">How many leave days carry over?</text>
        <line x1="16" y1="38" x2="408" y2="38" className="al-fig-rule" />
        <text x="16" y="62" className="al-fig-a">Up to 10 days carry into the next year.</text>
        <g transform="translate(16 72)">
          <rect width="96" height="16" className="al-fig-cite" />
          <text x="8" y="12" className="al-fig-cite-t">HR policy · p.12</text>
        </g>
      </g>
      <path d="M380 152 V206" className="al-fig-link" />
      <path d="M380 152 V206" className="al-fig-packet al-fig-packet--c" />
    </svg>
    <figcaption>One question, grounded answer, visible source.</figcaption>
  </figure>
)

const AIList = () => {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [activeLayer, setActiveLayer] = useState(null)

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main className="theme-ai pk-main">
      <header className="pk-hero" aria-labelledby="al-title">
        <div className="pk-hero-inner">
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">AI engineering</p>
            <h1 id="al-title" className="pk-title brand-title brand-fade-up">AI that works on your data and stays under your <span className="brand-mark">control</span></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">
              Agents, retrieval, vision and forecasting, built with test sets, access control and cost limits from
              the first week. We pick the smallest model that meets your quality bar.
            </p>
            <div className="pk-actions brand-fade-up brand-delay-2">
              <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Plan an AI pilot</button>
              <a href="#solutions" className="pk-btn">See what we build</a>
            </div>
          </div>
          <div className="brand-fade-up brand-delay-3"><PipelineFigure /></div>
        </div>
      </header>

      <section className="pk-section pk-section--sunk" aria-labelledby="al-demand">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="al-demand">What companies are asking for in 2026</h2>
            <p>These six topics come up in almost every conversation. Each has a pattern we have already proven.</p>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {aiTrends.map((t, i) => (
              <li key={t.title}>
                <div className="pk-tile">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="solutions" className="pk-section" aria-labelledby="al-solutions">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="al-solutions">Solutions</h2>
            <p>Pick a starting point. Each page lists the offers, the stack and what a first release looks like.</p>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {aiData.map((ai, i) => {
              const Icon = ai.icon
              return (
                <li key={ai.id}>
                  <Link to={`/ai/${ai.slug}`} className="pk-card brand-card">
                    <span className="pk-card-top">
                      <span className="pk-icon" aria-hidden="true"><Icon /></span>
                      <span className="al-card-count">{ai.whatWeOffer?.length || 0} offers</span>
                    </span>
                    <h3 className="pk-card-title">{ai.name}</h3>
                    <p className="pk-card-desc">{ai.shortDescription}</p>
                    <ul className="al-card-list">
                      {ai.whatWeOffer?.slice(0, 3).map((o) => <li key={o.title}>{o.title}</li>)}
                    </ul>
                    <span className="pk-card-more">View solution</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="al-stack">
        <div className="pk-wrap pk-split">
          <div data-reveal>
            <h2 id="al-stack">The production stack behind every build</h2>
            <p className="pk-split-text">
              A demo needs a model. A product needs the layers around it. Select a layer to see what we put there.
            </p>
          </div>
          <ol className="al-layers" data-reveal data-reveal-delay="1">
            {aiStackLayers.map((l, i) => (
              <li key={l.name}>
                <button
                  type="button"
                  className={`al-layer${activeLayer === i ? ' is-active' : ''}`}
                  aria-expanded={activeLayer === i}
                  onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                >
                  <span className="al-layer-name">{l.name}</span>
                  <span className="al-layer-items">{l.items}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="al-process">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="al-process">From idea to production in five steps</h2>
            <p>A written pass mark before any build, so everyone agrees what success looks like.</p>
          </div>
          <ol className="pk-steps pk-steps--5" data-reveal data-reveal-stagger>
            {aiProcess.map((s, i) => (
              <li key={s.title} className="pk-step">
                <span className="pk-num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="al-gov">
        <div className="pk-wrap pk-split">
          <div data-reveal>
            <h2 id="al-gov">Responsible by design</h2>
            <p className="pk-split-text">
              Risk review, logging and human handoff are part of the build. We map each project to the
              frameworks your auditors will ask about.
            </p>
          </div>
          <ul className="pk-list al-gov" data-reveal data-reveal-delay="1">
            {aiGovernance.map((g) => (
              <li key={g.name}><strong>{g.name}</strong><span>{g.note}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="al-faq">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="al-faq">Common questions</h2>
          </div>
          <div className="pk-acc pk-acc-narrow" data-reveal data-reveal-delay="1">
            {aiFaq.map((f, i) => (
              <div key={f.q} className={`pk-acc-item${openFaq === i ? ' is-open' : ''}`}>
                <h3>
                  <button type="button" className="pk-acc-btn" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="pk-acc-title">{f.q}</span><span className="pk-chev" aria-hidden="true" />
                  </button>
                </h3>
                <div className="pk-acc-panel"><div><p>{f.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Start with a two-week pilot</h2>
              <p>Bring one process and some sample data. You leave with a working prototype and a clear go or no-go.</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AIList
