import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FaCode, FaRocket, FaCheck, FaChevronDown, FaServer, FaDatabase,
    FaLaptopCode, FaArrowRight, FaArrowLeft
} from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiPython, SiTypescript, SiPostgresql, SiRedis, SiDocker, SiAmazonwebservices } from 'react-icons/si'
import { getServiceBySlug } from '../data/servicesData'
import { ServiceSchematic } from './ServiceSchematic'
import './ServiceDetail.css'
import './WebDevelopmentPage.css'
import './brand.css'


const WebDevelopmentPage = () => {
    const navigate = useNavigate()
    const service = getServiceBySlug('web-development')
    const [openFaq, setOpenFaq] = useState(null)
    const [activeTechTab, setActiveTechTab] = useState('frontend')

    if (!service) {
        return (
            <div className="sd-container">
                <div className="sd-not-found">
                    <h1>Service Not Found</h1>
                    <button onClick={() => navigate('/')} className="sd-btn-primary brand-btn-primary">
                        <FaArrowLeft /> Back to Home
                    </button>
                </div>
            </div>
        )
    }

    // Tech Stack Matrix Data
    const techStack = {
        frontend: {
            title: 'Frontend Engineering',
            desc: 'We build responsive, ultra-fast client-side interfaces using state-managed React architectures.',
            items: [
                { name: 'React 19', icon: SiReact, desc: 'Component-driven interactive modular design' },
                { name: 'TypeScript', icon: SiTypescript, desc: 'Type-safe codebase preventing compile-time bugs' },
                { name: 'Next.js', icon: SiReact, desc: 'Server-side rendering (SSR) for absolute SEO dominance' },
                { name: 'Modern CSS Grid', icon: FaCode, desc: 'Clean layout systems without bloated frameworks' }
            ]
        },
        backend: {
            title: 'Backend Systems',
            desc: 'Secure, multi-threaded server architectures built to scale horizontal request traffic.',
            items: [
                { name: 'Node.js', icon: SiNodedotjs, desc: 'Asynchronous event-driven I/O performance' },
                { name: 'Python / Django', icon: SiPython, desc: 'Robust data management and secure integrations' },
                { name: 'Go / APIs', icon: FaCode, desc: 'High concurrency backends with micro-millisecond response times' },
                { name: 'REST / GraphQL', icon: FaServer, desc: 'Optimized network routing for seamless data fetching' }
            ]
        },
        database: {
            title: 'Databases & Caching',
            desc: 'Highly indexed relational databases coupled with in-memory store systems.',
            items: [
                { name: 'PostgreSQL', icon: SiPostgresql, desc: 'Acid-compliant structured relational database' },
                { name: 'Redis Cache', icon: SiRedis, desc: 'Sub-millisecond query responses caching static requests' },
                { name: 'MongoDB', icon: FaDatabase, desc: 'Document store architecture for highly flexible schemas' },
                { name: 'Elasticsearch', icon: FaDatabase, desc: 'Fuzzy-logic enterprise log search indexer' }
            ]
        },
        infrastructure: {
            title: 'DevOps & Infrastructure',
            desc: 'Continuous delivery pipelines delivering secure cloud deployments.',
            items: [
                { name: 'Docker', icon: SiDocker, desc: 'Isolated system environment containerization' },
                { name: 'AWS Cloud', icon: SiAmazonwebservices, desc: 'Dynamic load balancing and auto-scaling' },
                { name: 'Nginx Engine', icon: FaServer, desc: 'Reverse proxy and Brotli compilation routers' },
                { name: 'GitHub Actions', icon: FaRocket, desc: 'Continuous integration and instant deployments' }
            ]
        }
    }

    return (
        <div className="sd-container">
            {/* ─── Hero Section ────────────────────────────────────────── */}
            <section className="sd-hero">
                
                <div className="sd-hero-inner">
                    <div className="sd-hero-grid-split">
                        
                        {/* Left Column: Content */}
                        <div className="sd-hero-content-block">
                            <div className="sd-hero-tag">
                                <FaLaptopCode /> Enterprise Web Engineering
                            </div>
                            <h1 className="sd-hero-title brand-title brand-fade-up">
                                Web Applications <br />
                                Engineered to <span className="brand-mark">Scale</span>
                            </h1>
                            <p className="sd-hero-desc brand-fade-up brand-delay-1">
                                We craft premium, high-performance web applications that load instantly, secure your data, and grow with your traffic. Built on modern React frameworks and microservice architectures.
                            </p>

                            <div className="sd-feature-badges">
                                {service.features?.map((feat, i) => (
                                    <span key={i} className="sd-badge">
                                        <FaCheck className="sd-badge-icon" /> {feat}
                                    </span>
                                ))}
                            </div>

                            <div className="sd-hero-cta brand-fade-up brand-delay-2">
                                <button 
                                    className="sd-btn-primary brand-btn-primary"
                                    onClick={() => {
                                        navigate('/')
                                        setTimeout(() => {
                                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                                        }, 200)
                                    }}
                                >
                                    Launch Your Project <FaRocket />
                                </button>
                                <button className="sd-btn-secondary" onClick={() => navigate('/#portfolio')}>
                                    Explore Portfolio
                                </button>
                            </div>
                        </div>

                        {/* Right Column: schematic */}
                        <div className="sch-panel" data-reveal="wipe"><ServiceSchematic slug={'web-development'} /></div>

                    </div>

                    {/* Stats Summary Bar */}
                    <div className="sd-hero-stats">
                        <div className="sd-hero-stat">
                            <strong>CI/CD</strong>
                            <span>Automated, Reviewed Deploys</span>
                        </div>
                        <div className="sd-hero-stat">
                            <strong>&lt;200ms</strong>
                            <span>Edge Node TTFB</span>
                        </div>
                        <div className="sd-hero-stat">
                            <strong>100%</strong>
                            <span>Responsive & Accessible</span>
                        </div>
                        <div className="sd-hero-stat">
                            <strong>GDPR</strong>
                            <span>Compliance Built-in</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Key Benefits Section ─────────────────────────────────── */}
            {service.benefits?.length > 0 && (
                <section className="sd-section sd-alt-bg">
                    <div className="sd-inner">
                        <div className="brand-section-head" data-reveal>
<span className="brand-eyebrow">Metrics That Matter</span>
<h2 className="brand-section-title">Key Core Benefits</h2>
<p className="brand-section-lede">We design and build systems around performance indices that improve conversions and lower bounce rates.</p>
</div>

                        <div className="sd-benefits-grid" data-reveal data-reveal-stagger>
                            {service.benefits.map((benefit, i) => (
                                <div key={i} className="sd-benefit-card brand-card">
                                    <span className="sd-benefit-num">0{i + 1}</span>
                                    <p>{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Interactive Technology Matrix ────────────────────────── */}
            <section className="sd-section">
                <div className="sd-inner">
                    <div className="brand-section-head" data-reveal>
<span className="brand-eyebrow">The Tech Matrix</span>
<h2 className="brand-section-title">Modern Web Stack</h2>
<p className="brand-section-lede">We select highly resilient technology tools that maintain stability, compliance, and long-term modularity.</p>
</div>

                    <div className="wd-matrix" data-reveal data-reveal-delay="1">
                        {/* Tab Headers */}
                        <div className="wd-matrix-tabs" role="tablist" aria-label="Technology areas">
                            <button
 type="button" role="tab" aria-selected={activeTechTab === 'frontend'}
 className={`matrix-tab-btn ${activeTechTab === 'frontend' ? 'active' : ''}`}
                                onClick={() => setActiveTechTab('frontend')}
                            >
                                Frontend
                            </button>
                            <button
 type="button" role="tab" aria-selected={activeTechTab === 'backend'}
 className={`matrix-tab-btn ${activeTechTab === 'backend' ? 'active' : ''}`}
                                onClick={() => setActiveTechTab('backend')}
                            >
                                Backend
                            </button>
                            <button
 type="button" role="tab" aria-selected={activeTechTab === 'database'}
 className={`matrix-tab-btn ${activeTechTab === 'database' ? 'active' : ''}`}
                                onClick={() => setActiveTechTab('database')}
                            >
                                Data Stores
                            </button>
                            <button
 type="button" role="tab" aria-selected={activeTechTab === 'infrastructure'}
 className={`matrix-tab-btn ${activeTechTab === 'infrastructure' ? 'active' : ''}`}
                                onClick={() => setActiveTechTab('infrastructure')}
                            >
                                DevOps
                            </button>
                        </div>

                        {/* Tab Content Panel */}
                        <div className="wd-matrix-content" key={activeTechTab} role="tabpanel">
                            <div className="matrix-info">
                                <h3>{techStack[activeTechTab].title}</h3>
                                <p>{techStack[activeTechTab].desc}</p>
                            </div>
                            <div className="matrix-grid">
                                {techStack[activeTechTab].items.map((item, idx) => {
                                    const TechIcon = item.icon
                                    return (
                                        <div key={idx} className="matrix-item-card">
                                            <div className="matrix-item-icon">
                                                <TechIcon />
                                            </div>
                                            <div className="matrix-item-text">
                                                <h4>{item.name}</h4>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Process + Case Applications (side by side) ───────────── */}
            {(service.process?.length > 0 || service.useCases?.length > 0) && (
                <section className="sd-section sd-alt-bg">
                    <div className="sd-inner sd-duo">
                        {service.process?.length > 0 && (
                            <div className="sd-duo-col" data-reveal>
                                <span className="brand-eyebrow">Development Pipeline</span>
<h2 className="brand-section-title">Our Working Process</h2>
                                <ol className="sd-steps">
                                    {service.process.map((step) => (
                                        <li key={step.step} className="sd-step-row">
                                            <span className="sd-step-num" aria-hidden="true">{step.step}</span>
                                            <div>
                                                <h3>{step.title}</h3>
                                                <p>{step.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                        {service.useCases?.length > 0 && (
                            <div className="sd-duo-col" data-reveal>
                                <span className="brand-eyebrow">Proven Solutions</span>
<h2 className="brand-section-title">Case Applications</h2>
                                <ul className="sd-uc-list">
                                    {service.useCases.map((uc) => {
                                        const UCIcon = uc.icon || FaCode
                                        return (
                                            <li key={uc.title} className="sd-uc-row">
                                                <span className="sd-uc-icon" aria-hidden="true"><UCIcon /></span>
                                                <div>
                                                    <h3>{uc.title}</h3>
                                                    <p>{uc.description}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ─── FAQ Section ─────────────────────────────────────────── */}
            {service.faq?.length > 0 && (
                <section className="sd-section">
                    <div className="sd-inner">
                        <div className="brand-section-head" data-reveal>
<span className="brand-eyebrow">FAQ</span>
<h2 className="brand-section-title">Frequently Asked Questions</h2>
</div>

                        <div className="sd-faq-list" data-reveal data-reveal-delay="1">
                            {service.faq.slice(0, 4).map((item, i) => (
                                <div 
                                    key={i} 
                                    className={`sd-faq-item ${openFaq === i ? 'open' : ''}`}
                                >
                                    <button
                                        type="button"
                                        className="sd-faq-q"
                                        onClick={() => setOpenFaq(prev => prev === i ? null : i)}
                                        aria-expanded={openFaq === i}
                                    >
                                        <span>{item.question}</span>
                                        <FaChevronDown className="sd-faq-chevron" />
                                    </button>
                                    <div className="sd-faq-a">
                                        <div><p>{item.answer}</p></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Bottom Call To Action ───────────────────────────────── */}
            <section className="sd-cta">
                <div className="sd-cta-inner" data-reveal>
                    <span className="brand-eyebrow">Let's Build</span>
                    <h2>Ready to Build Your Web Application?</h2>
                    <p>
                        Schedule a technical session with our software architect to plan your stack, architecture model, and release sprints.
                    </p>
                    <div className="sd-cta-btns">
                        <button 
                            className="sd-btn-primary brand-btn-primary"
                            onClick={() => {
                                navigate('/')
                                setTimeout(() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                                }, 200)
                            }}
                        >
                            Request Consultation <FaArrowRight />
                        </button>
                        <button className="sd-btn-secondary" onClick={() => navigate('/#portfolio')}>
                            Review Case Studies
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WebDevelopmentPage
