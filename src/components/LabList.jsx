import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllBlogPosts, getLabCategories } from '../data/blogData'
import './PageKit.css'
import './LabList.css'
import './brand.css'

const LabList = () => {
  const navigate = useNavigate()
  const posts = useMemo(() => getAllBlogPosts(), [])
  const categories = useMemo(() => getLabCategories(), [])
  const [active, setActive] = useState('all')
  const shown = active === 'all' ? posts : posts.filter((p) => p.categorySlug === active)

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main id="main" className="theme-ai pk-main">
      <header className="pk-hero lab-hero" aria-labelledby="lab-title">
        <div className="pk-hero-inner lab-hero-inner">
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">LAB</p>
            <h1 id="lab-title" className="pk-title brand-title brand-fade-up">Interactive AI <span className="brand-mark">lab</span></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">
              Hands-on visual explainers of the maths behind the AI we ship. Drag, tweak and watch
              vectors, loss surfaces and gradients behave in real time.
            </p>
          </div>
        </div>
      </header>

      <section className="pk-section pk-section--sunk" aria-labelledby="lab-grid-title">
        <div className="pk-wrap">
          <h2 id="lab-grid-title" className="pk-sr">Lab experiments</h2>
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
          <p className="pk-count" aria-live="polite">{shown.length} interactive {shown.length === 1 ? 'experiment' : 'experiments'}</p>

          <ul className="pk-grid" key={active} data-reveal data-reveal-stagger>
            {shown.map((p) => (
              <li key={p.slug}>
                <Link to={`/lab/${p.slug}`} className="pk-card brand-card">
                  <span className="pk-card-top">
                    <span className="lab-cat">{p.category}</span>
                  </span>
                  <h3 className="pk-card-title">{p.title}</h3>
                  <p className="pk-card-desc">{p.description}</p>
                  <ul className="lab-tags" aria-label="Topics">
                    {p.tags.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <span className="pk-card-more">Open</span>
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
              <h2>Need this maths in your product?</h2>
              <p>We turn models like these into dependable, tested features. Tell us what you want to predict or automate.</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LabList
