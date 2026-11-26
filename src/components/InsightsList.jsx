import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllArticles, getArticleCategories, categorySlug } from '../data/articles'
import './PageKit.css'
import './InsightsList.css'
import './brand.css'

const InsightsList = () => {
  const navigate = useNavigate()
  const posts = useMemo(() => getAllArticles(), [])
  const categories = useMemo(() => getArticleCategories(), [])
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? posts : posts.filter((p) => categorySlug(p.category) === active)

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main id="main" className="theme-ai pk-main">
      <header className="pk-hero ins-hero" aria-labelledby="ins-title">
        <div className="pk-hero-inner ins-hero-inner">
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">INSIGHTS</p>
            <h1 id="ins-title" className="pk-title brand-title brand-fade-up">Practical notes on <span className="brand-mark">building</span> with AI</h1>
            <p className="pk-lede brand-fade-up brand-delay-1">
              Plain-language articles from Team Hunexture on websites, apps, WhatsApp automation and AI.
              What works, what does not, and what we would do first.
            </p>
          </div>
        </div>
      </header>

      <section className="pk-section pk-section--sunk" aria-labelledby="ins-grid-title">
        <div className="pk-wrap">
          <h2 id="ins-grid-title" className="pk-sr">Articles</h2>
          <div className="pk-toolbar" data-reveal>
            <div className="pk-chips" role="group" aria-label="Filter by category">
              <button type="button" className={`pk-chip${active === 'all' ? ' is-active' : ''}`} aria-pressed={active === 'all'} onClick={() => setActive('all')}>
                All <span className="pk-chip-n">{posts.length}</span>
              </button>
              {categories.map((c) => (
                <button key={c.slug} type="button" className={`pk-chip${active === c.slug ? ' is-active' : ''}`} aria-pressed={active === c.slug} onClick={() => setActive(c.slug)}>
                  {c.name} <span className="pk-chip-n">{c.count}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="pk-count" aria-live="polite">{shown.length} {shown.length === 1 ? 'article' : 'articles'}</p>

          <ul className="pk-grid" key={active} data-reveal data-reveal-stagger>
            {shown.map((p) => (
              <li key={p.slug}>
                <Link to={`/insights/${p.slug}`} className="pk-card brand-card">
                  <span className="pk-card-top">
                    <span className="ins-cat">{p.category}</span>
                    <span className="ins-read">{p.readMinutes} min read</span>
                  </span>
                  <h3 className="pk-card-title">{p.title}</h3>
                  <p className="pk-card-desc">{p.description}</p>
                  <span className="pk-card-more">Read article</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Have a question we did not cover?</h2>
              <p>Tell us what you are trying to fix. We will give you an honest view, even if the answer is "you do not need this yet".</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default InsightsList
