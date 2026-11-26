import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { industriesData } from '../data/industriesData'
import { industryMeta, industryClusters, industryDemand } from '../data/insights'
import './PageKit.css'
import './IndustriesList.css'
import './brand.css'


const CLUSTER_LABEL = Object.fromEntries(industryClusters.map((c) => [c.id, c.label]))

const IndustriesList = () => {
  const navigate = useNavigate()
  const [cluster, setCluster] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('healthcare')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return industriesData.filter((ind) => {
      const meta = industryMeta[ind.slug]
      if (cluster !== 'all' && meta?.cluster !== cluster) return false
      if (!q) return true
      return `${ind.name} ${ind.shortDescription} ${meta?.regs?.join(' ') || ''}`.toLowerCase().includes(q)
    })
  }, [cluster, query])

  const active = industriesData.find((i) => i.slug === selected) || industriesData[0]
  const activeMeta = industryMeta[active.slug]

  const goContact = () => {
    navigate('/')
    setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 200)
  }

  return (
    <main className="theme-ind pk-main">
      <header className="pk-hero" aria-labelledby="il-title">
        <div className="pk-hero-inner">
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">Industries</p>
            <h1 id="il-title" className="pk-title brand-title brand-fade-up">Software shaped by the rules of your <span className="brand-mark">sector</span></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">
              Healthcare needs consent trails, finance needs ledgers that reconcile, retail needs stock that is
              right on every channel. We start from those requirements, not from a template.
            </p>
            <dl className="pk-facts brand-fade-up brand-delay-2">
              <div><dt data-count>{industriesData.length}</dt><dd>sectors</dd></div>
              <div><dt data-count>{new Set(Object.values(industryMeta).flatMap((m) => m.regs)).size}</dt><dd>standards mapped</dd></div>
              <div><dt data-count>4</dt><dd>sector groups</dd></div>
            </dl>
          </div>
          <div className="pk-fig il-map brand-fade-up brand-delay-3" aria-hidden="true">
            {industriesData.map((ind, i) => {
              const Icon = ind.icon
              return (
                <span key={ind.slug} className="il-map-tile" style={{ animationDelay: `${(i * 0.37) % 6}s` }}>
                  <Icon />
                </span>
              )
            })}
          </div>
        </div>
      </header>

      <section id="sectors" className="pk-section pk-section--sunk" aria-labelledby="il-browse">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="il-browse">Find your sector</h2>
            <p>Filter by group or search by name or standard, such as HIPAA, PCI DSS or FHIR.</p>
          </div>
          <div className="pk-toolbar" data-reveal data-reveal-delay="1">
            <div className="pk-chips" role="group" aria-label="Filter by sector group">
              {industryClusters.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`pk-chip${cluster === c.id ? ' is-active' : ''}`}
                  aria-pressed={cluster === c.id}
                  onClick={() => setCluster(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className="il-search">
              <span className="pk-sr">Search sectors</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search, e.g. HIPAA" />
            </label>
          </div>
          <p className="pk-count" aria-live="polite">{rows.length} of {industriesData.length} sectors</p>
          <ul className="pk-grid" key={`${cluster}|${query}`} data-reveal data-reveal-stagger>
            {rows.map((ind, i) => {
              const Icon = ind.icon
              const meta = industryMeta[ind.slug]
              return (
                <li key={ind.slug}>
                  <Link to={`/industries/${ind.slug}`} className="pk-card il-card brand-card">
                    <span className="pk-card-top">
                      <span className="pk-icon" aria-hidden="true"><Icon /></span>
                      <span className="il-card-group">{CLUSTER_LABEL[meta?.cluster]}</span>
                    </span>
                    <h3 className="pk-card-title">{ind.name}</h3>
                    <p className="pk-card-desc">{meta?.demand || ind.shortDescription}</p>
                    <ul className="il-regs" aria-label={`Standards for ${ind.name}`}>
                      {meta?.regs.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                    <span className="pk-card-more">See {ind.name.toLowerCase()} solutions</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {rows.length === 0 && (
            <p className="pk-empty">No sector matches that search. Clear the filter or try a standard name like GDPR.</p>
          )}
        </div>
      </section>

      <section id="architecture" className="pk-section" aria-labelledby="il-arch">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="il-arch">Reference architecture by sector</h2>
            <p>Where we start before adapting to your systems. Choose a sector to see the four building blocks.</p>
          </div>
          <div className="il-explorer" data-reveal data-reveal-delay="1">
            <div className="il-tabs" role="tablist" aria-label="Sector">
              {industriesData.map((ind) => (
                <button
                  key={ind.slug}
                  type="button"
                  role="tab"
                  aria-selected={selected === ind.slug}
                  className={`il-tab${selected === ind.slug ? ' is-active' : ''}`}
                  onClick={() => setSelected(ind.slug)}
                >
                  {ind.name}
                </button>
              ))}
            </div>
            <div className="il-panel" role="tabpanel" key={active.slug}>
              <div className="il-panel-head">
                <h3>{active.name}</h3>
                <p>{activeMeta?.demand}</p>
              </div>
              <ol className="il-flow">
                {activeMeta?.pipeline.map(([label, desc], i) => (
                  <li key={label} className="il-node" style={{ animationDelay: `${i * 0.08}s` }}>
                    <span className="pk-num" aria-hidden="true">{i + 1}</span>
                    <strong>{label}</strong>
                    <span>{desc}</span>
                  </li>
                ))}
              </ol>
              <div className="il-panel-foot">
                <ul className="il-regs il-regs--lg" aria-label="Standards">
                  {activeMeta?.regs.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <ul className="il-stats">
                  {active.stats?.slice(0, 3).map((s) => (
                    <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>
                  ))}
                </ul>
                <Link to={`/industries/${active.slug}`} className="il-link brand-link">Full {active.name.toLowerCase()} page</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="il-req">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="il-req">What buyers require now</h2>
            <p>Four requirements show up in nearly every tender and security review across sectors.</p>
          </div>
          <ul className="pk-grid pk-grid--4" data-reveal data-reveal-stagger>
            {industryDemand.map((d, i) => (
              <li key={d.title} className="il-req">
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Not sure which standard applies to you?</h2>
              <p>Describe your product and market. We list the rules that matter and what they change in the build.</p>
            </div>
            <button type="button" className="pk-btn pk-btn--primary brand-btn-primary" onClick={goContact}>Book a discovery call</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default IndustriesList
