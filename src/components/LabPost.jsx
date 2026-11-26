import React, { Suspense, lazy, useEffect, useMemo, useRef } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getAllBlogPosts, getLabPost } from '../data/blogData'
import './PageKit.css'
import './LabPost.css'
import './brand.css'

// three.js stays out of the main bundle: each visualizer is its own lazy chunk.
const VISUALIZERS = {
  VectorVisualization3D: lazy(() => import('./VectorVisualization3D')),
  DotProduct3D: lazy(() => import('./DotProduct3D')),
  MatrixTransformation3D: lazy(() => import('./MatrixTransformation3D')),
  LossFunctionMSE: lazy(() => import('./LossFunctionMSE')),
  GradientDescent3D: lazy(() => import('./GradientDescent3D')),
  GradientDescentVisualizer: lazy(() => import('./GradientDescentVisualizer')),
  LogisticRegression3D: lazy(() => import('./LogisticRegression3D')),
  ConditionalProbability3D: lazy(() => import('./ConditionalProbability3D')),
}

const Skeleton = () => (
  <div className="lab-skeleton" role="status" aria-live="polite">
    <span className="lab-skeleton-bar" />
    <span className="pk-sr">Loading visualization</span>
  </div>
)

// Give unlabeled controls inside a visualizer an accessible name from nearby label text.
const labelControls = (root) => {
  root.querySelectorAll('input:not([aria-label]):not([aria-labelledby]), select:not([aria-label])').forEach((el) => {
    if (el.id && root.querySelector(`label[for="${el.id}"]`)) return
    if (el.closest('label') && el.closest('label').textContent.trim()) return
    let node = el.parentElement
    while (node && node !== root) {
      const l = node.querySelector(':scope > label, :scope > .slider-header label, :scope > .slider-header-gd label')
      if (l && l.textContent.trim()) { el.setAttribute('aria-label', l.textContent.replace(/\s+/g, ' ').trim().replace(/:\s*-?[\d.]+$/, '')); return }
      node = node.parentElement
    }
  })
}

const LabPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const stageRef = useRef(null)
  const post = getLabPost(slug)
  const all = useMemo(() => getAllBlogPosts(), [])

  useEffect(() => {
    const root = stageRef.current
    if (!root) return undefined
    labelControls(root)
    const mo = new MutationObserver(() => labelControls(root))
    mo.observe(root, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [slug])

  if (!post) return <Navigate to="/lab" replace />

  const Viz = VISUALIZERS[post.component]
  const idx = all.findIndex((p) => p.slug === post.slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null
  const related = all.filter((p) => p.slug !== post.slug && p.categorySlug === post.categorySlug)
    .concat(all.filter((p) => p.slug !== post.slug && p.categorySlug !== post.categorySlug)).slice(0, 3)

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main id="main" className="theme-ai pk-main">
      <header className="pk-hero lab-post-hero" aria-labelledby="lp-title">
        <div className="pk-hero-inner lab-post-hero-inner">
          <p className="pk-eyebrow pk-crumbs">
            <Link to="/lab">Lab</Link><span aria-hidden="true">/</span><span>{post.category}</span>
          </p>
          <h1 id="lp-title" className="pk-title brand-title brand-fade-up">{post.title}</h1>
          <p className="pk-lede brand-fade-up brand-delay-1">{post.description}</p>
        </div>
      </header>

      <section className="pk-section lab-stage-section" aria-label="Interactive visualization">
        <div className="pk-wrap">
          <div className="lab-panel" data-reveal>
            <div className="lab-stage" ref={stageRef}>
              <Suspense fallback={<Skeleton />}>{Viz ? <Viz /> : null}</Suspense>
            </div>
          </div>
          <p className="lab-hint">Drag to rotate, scroll to zoom, right-drag to pan.</p>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="lp-explain">
        <div className="pk-wrap lab-explain">
          <div data-reveal>
            <h2 id="lp-explain">What you're seeing</h2>
            <p className="pk-split-text lab-explain-text">{post.description}</p>
            <ul className="lab-tags" aria-label="Topics">
              {post.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="pk-section" aria-label="More experiments">
        <div className="pk-wrap">
          <nav className="lab-pager" aria-label="Previous and next experiment" data-reveal>
            {prev ? (
              <Link to={`/lab/${prev.slug}`} className="lab-pager-link" rel="prev">
                <span className="lab-pager-dir">Previous</span><span className="lab-pager-title">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/lab/${next.slug}`} className="lab-pager-link lab-pager-link--next" rel="next">
                <span className="lab-pager-dir">Next</span><span className="lab-pager-title">{next.title}</span>
              </Link>
            ) : <span />}
          </nav>

          <div className="pk-head" data-reveal>
            <h2>Related experiments</h2>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {related.map((p) => (
              <li key={p.slug}>
                <Link to={`/lab/${p.slug}`} className="pk-card brand-card">
                  <span className="pk-card-top"><span className="lab-cat">{p.category}</span></span>
                  <h3 className="pk-card-title">{p.title}</h3>
                  <p className="pk-card-desc">{p.description}</p>
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
              <p>We turn models like this into dependable, tested features. Tell us what you want to predict or automate.</p>
            </div>
            <a href="/#contact" className="pk-btn pk-btn--primary brand-btn-primary" onClick={(e) => { e.preventDefault(); goContact() }}>Book a discovery call</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LabPost
