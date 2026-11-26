import React, { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getAllArticles, getArticle, formatDate, sectionId } from '../data/articles'
import './PageKit.css'
import './LabList.css'
import './InsightsList.css'
import './InsightPost.css'
import './brand.css'

const InsightPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getArticle(slug)
  const all = useMemo(() => getAllArticles(), [])
  const [current, setCurrent] = useState('')

  useEffect(() => {
    if (!post || post.sections.length < 4 || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id) })
    }, { rootMargin: '-20% 0px -70% 0px' })
    post.sections.forEach((s) => {
      const el = document.getElementById(sectionId(s.heading))
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [post])

  if (!post) return <Navigate to="/insights" replace />

  const related = all.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (b.category === post.category) - (a.category === post.category)).slice(0, 3)
  const showToc = post.sections.length >= 4

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main id="main" className="theme-ai pk-main">
      <header className="pk-hero ip-hero" aria-labelledby="ip-title">
        <div className="pk-hero-inner ip-hero-inner">
          <p className="pk-eyebrow pk-crumbs">
            <Link to="/insights">Insights</Link><span aria-hidden="true">/</span><span>{post.category}</span>
          </p>
          <h1 id="ip-title" className="pk-title brand-title brand-fade-up">{post.title}</h1>
          <p className="pk-lede brand-fade-up brand-delay-1">{post.description}</p>
          <p className="ip-meta">
            <span>By Team Hunexture</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readMinutes} min read</span>
          </p>
        </div>
      </header>

      <section className="pk-section ip-body-section">
        <div className={`pk-wrap ip-layout${showToc ? ' has-toc' : ''}`}>
          {showToc && (
            <nav className="ip-toc" aria-label="On this page">
              <p className="ip-toc-title">On this page</p>
              <ol>
                {post.sections.map((s) => {
                  const id = sectionId(s.heading)
                  return (
                    <li key={id}>
                      <a href={`#${id}`} className={current === id ? 'is-current' : undefined} aria-current={current === id ? 'true' : undefined}>{s.heading}</a>
                    </li>
                  )
                })}
              </ol>
            </nav>
          )}
          <article className="ip-article">
            {post.sections.map((s) => (
              <section key={s.heading} className="ip-sec">
                <h2 id={sectionId(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((t, i) => <p key={i}>{t}</p>)}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <ul className="lab-tags ip-tags" aria-label="Topics">
              {post.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="ip-related">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="ip-related">Keep reading</h2>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {related.map((p) => (
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
              <h2>Want this for your business?</h2>
              <p>Book a discovery call. We will look at your situation and tell you honestly what we would do first.</p>
            </div>
            <a href="/#contact" className="pk-btn pk-btn--primary brand-btn-primary" onClick={(e) => { e.preventDefault(); goContact() }}>Book a discovery call</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default InsightPost
