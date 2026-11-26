import React from 'react'
import { Link } from 'react-router-dom'
import { featuredLab } from '../data/navIndex'
import './LabTeaser.css'

const Art = ({ kind }) => {
  const common = { className: 'lt-art', 'data-draw': true, viewBox: '0 0 160 80', 'aria-hidden': 'true', focusable: 'false', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (kind === 'descent') return (
    <svg {...common}><path d="M10 14 C 40 80, 80 80, 150 14" /><path d="M28 46 L 52 64 L 68 70" strokeDasharray="3 5" /><circle cx="80" cy="70" r="4" /></svg>
  )
  if (kind === 'sigmoid') return (
    <svg {...common}><path d="M10 68 H150 M10 12 H150" strokeDasharray="2 6" opacity=".5" /><path d="M10 66 C 60 66, 60 14, 150 14" /></svg>
  )
  return (
    <svg {...common}><path d="M20 66 L 112 22 M20 66 L 130 62" /><path d="M104 20 L 114 21 L 108 29 M122 57 L 131 62 L 122 67" /><path d="M48 54 A 30 30 0 0 1 52 64" /></svg>
  )
}

const LabTeaser = () => (
  <section id="lab" className="bp-section bp-section--alt lt-section" aria-labelledby="lab-teaser-title">
    <div className="bp-container">
      <div className="bp-head" data-reveal>
        <span className="brand-eyebrow">THE LAB</span>
        <h2 id="lab-teaser-title">The maths behind our <span className="brand-mark">AI</span></h2>
        <p>See the maths behind the AI we ship — interactive, in your browser.</p>
      </div>
      <ul className="lt-grid" data-reveal data-reveal-stagger>
        {featuredLab.map((p) => (
          <li key={p.slug}>
            <Link to={`/lab/${p.slug}`} className="lt-card brand-card">
              <Art kind={p.art} />
              <span className="lt-cat">{p.category}</span>
              <h3 className="lt-title">{p.title}</h3>
              <p className="lt-desc">{p.description}</p>
              <span className="lt-open brand-link">Open in Lab →</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="lt-cta" data-reveal>
        <Link to="/lab" className="bp-btn bp-btn-primary">Explore the Lab</Link>
      </div>
    </div>
  </section>
)

export default LabTeaser
