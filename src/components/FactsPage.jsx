import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getFacts } from '../data/facts'
import './PageKit.css'
import './FactsPage.css'
import './brand.css'

const Section = ({ id, title, children }) => (
  <section className="pk-section" aria-labelledby={id}>
    <div className="pk-wrap">
      <h2 id={id} className="facts-h2" data-reveal>{title}</h2>
      <div data-reveal>{children}</div>
    </div>
  </section>
)

const Row = ({ term, children }) => (
  <div className="facts-row">
    <dt>{term}</dt>
    <dd>{children}</dd>
  </div>
)

const LinkList = ({ items }) => (
  <ul className="facts-list">
    {items.map((i) => (
      <li key={i.path}>
        <Link className="brand-link" to={i.path}>{i.name}</Link>
        {i.description ? <span>{`: ${i.description}`}</span> : null}
      </li>
    ))}
  </ul>
)

const FactsPage = () => {
  const f = useMemo(() => getFacts(), [])
  return (
    <main id="main" className="theme-ai pk-main facts-page">
      <header className="pk-hero" aria-labelledby="facts-title">
        <div className="pk-hero-inner facts-hero">
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">Company facts</p>
            <h1 id="facts-title" className="pk-title brand-title brand-fade-up">Hunexture <span className="brand-mark">at a glance</span></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">{f.summary}</p>
          </div>
        </div>
      </header>

      <Section id="facts-who" title="Who we are">
        <dl className="facts-dl">
          <Row term="Name">{f.name}</Row>
          <Row term="Type">Software, AI and web development company</Row>
          <Row term="Website"><a className="brand-link" href={f.url}>{f.url}</a></Row>
          <Row term="Location">{f.location}</Row>
          <Row term="Serves">Startups, SMEs and enterprises worldwide</Row>
          {f.stats.map((s) => (
            <Row key={s.label} term={s.label}>{s.value} (company-reported)</Row>
          ))}
          <Row term="Built on">{f.stack.join(', ')}</Row>
        </dl>
      </Section>

      <Section id="facts-build" title="What we build">
        <h3 className="facts-h3">Services</h3>
        <LinkList items={f.services} />
        <h3 className="facts-h3">AI and machine learning</h3>
        <LinkList items={f.ai} />
      </Section>

      <Section id="facts-industries" title="Who we work with">
        <p className="facts-p">We build software for these sectors:</p>
        <ul className="facts-list facts-list--cols">
          {f.industries.map((i) => (
            <li key={i.path}><Link className="brand-link" to={i.path}>{i.name}</Link></li>
          ))}
        </ul>
      </Section>

      <Section id="facts-how" title="How we work">
        <dl className="facts-dl">
          {f.practices.map((p) => (
            <Row key={p.title} term={p.title}>{p.description}</Row>
          ))}
          {f.start.map((s) => (
            <Row key={s.question} term={s.question}>{s.answer}</Row>
          ))}
        </dl>
        <h3 className="facts-h3">Engagement models</h3>
        <dl className="facts-dl">
          {f.engagementModels.map((m) => (
            <Row key={m.name} term={m.name}>
              {`${m.howItWorks} Best for: ${m.bestFor}. Pricing basis: ${m.pricing}.`}
            </Row>
          ))}
        </dl>
        <h3 className="facts-h3">Security and confidentiality</h3>
        <p className="facts-p">{f.security}</p>
      </Section>

      <Section id="facts-where" title="Where and how to reach us">
        <dl className="facts-dl">
          <Row term="Location">{f.location}</Row>
          <Row term="Email"><a className="brand-link" href={`mailto:${f.contact.email}`}>{f.contact.email}</a></Row>
          <Row term="Phone"><a className="brand-link" href={f.contact.phoneHref}>{f.contact.phone}</a></Row>
          <Row term="WhatsApp"><a className="brand-link" href={f.contact.whatsapp}>{f.contact.phone}</a></Row>
          {f.social.map((s) => (
            <Row key={s.name} term={s.name}><a className="brand-link" href={s.url} rel="noopener noreferrer">{s.url}</a></Row>
          ))}
        </dl>
        <p className="facts-p">
          Machine-readable copies of this site: <a className="brand-link" href="/llms.txt">llms.txt</a> and{' '}
          <a className="brand-link" href="/llms-full.txt">llms-full.txt</a>.
        </p>
      </Section>
    </main>
  )
}

export default FactsPage
