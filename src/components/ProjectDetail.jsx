import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaExternalLinkAlt, FaGithub, FaClock, FaUsers, FaIndustry, FaQuoteLeft } from 'react-icons/fa';
import { getProjectBySlug, getRelatedProjects } from '../data/portfolioData';
import CoverArt from './CoverArt';
import './PageKit.css';
import './ProjectDetail.css';
import BrandTitle from './BrandMark'
import './brand.css'


const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="pk-main pd-missing">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/" className="pk-btn pk-btn--primary brand-btn-primary">
          <FaArrowLeft aria-hidden="true" />&nbsp;Back to Home
        </Link>
      </main>
    );
  }

  const IconComponent = project.icon;
  const relatedProjects = getRelatedProjects(project.id);
  // keep section backgrounds alternating when the optional testimonial is absent
  const relatedSunk = Boolean(project.testimonial);

  return (
    <main className="theme-pf pk-main">
      <header className="pk-hero" aria-labelledby="pd-title">
        <div className="pk-hero-inner">
          <div className="pk-hero-copy">
            <nav className="pk-eyebrow pk-crumbs" aria-label="Breadcrumb">
              <Link to="/portfolio" className="pd-back brand-link"><FaArrowLeft aria-hidden="true" /> Portfolio</Link>
              <span aria-hidden="true">/</span><span>{project.categoryLabel}</span>
            </nav>
            <span className="pk-icon-lg" aria-hidden="true"><IconComponent /></span>
            <h1 id="pd-title" className="pk-title brand-title brand-fade-up"><BrandTitle text={project.title} /></h1>
            <p className="pk-lede brand-fade-up brand-delay-1">{project.description}</p>
            <ul className="pk-tags pd-tags brand-fade-up brand-delay-2" aria-label="Technologies">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            {(project.liveUrl || project.githubUrl) && (
              <div className="pk-actions brand-fade-up brand-delay-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pk-btn pk-btn--primary brand-btn-primary">
                    <FaExternalLinkAlt aria-hidden="true" />&nbsp;Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pk-btn">
                    <FaGithub aria-hidden="true" />&nbsp;View Code
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="pd-art" data-reveal="wipe" aria-hidden="true">
            <CoverArt category={project.category} seed={project.id} />
          </div>
        </div>
        <div className="pk-wrap">
          <ul className="pd-info brand-fade-up brand-delay-3">
            <li><FaClock className="pd-info-icon" aria-hidden="true" /><div><span className="pd-info-label">Timeline</span><span className="pd-info-value">{project.timeline}</span></div></li>
            <li><FaUsers className="pd-info-icon" aria-hidden="true" /><div><span className="pd-info-label">Team Size</span><span className="pd-info-value">{project.teamSize}</span></div></li>
            <li><FaIndustry className="pd-info-icon" aria-hidden="true" /><div><span className="pd-info-label">Industry</span><span className="pd-info-value">{project.industry}</span></div></li>
          </ul>
        </div>
      </header>

      <section className="pk-section pk-section--sunk" aria-label="Challenge and solution">
        <div className="pk-wrap pk-duo">
          <div className="pk-tile pd-tile" data-reveal>
            <h2>The Challenge</h2>
            <p>{project.challenge}</p>
          </div>
          <div className="pk-tile pd-tile" data-reveal data-reveal-delay="1">
            <h2>Our Solution</h2>
            <p>{project.solution}</p>
          </div>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="pd-results">
        <div className="pk-wrap">
          <div className="pk-head" data-reveal>
            <h2 id="pd-results">Illustrative Results</h2>
            <p className="pd-disclaimer">
              Example metrics for a project of this kind — not figures reported by a named client.
            </p>
          </div>
          <ul className="pk-grid pk-grid--4" data-reveal data-reveal-stagger>
            {project.results.map((result, i) => (
              <li key={result.label}>
                <div className="pk-tile pd-result">
                  <div className="pd-metric" data-count>{result.metric}</div>
                  <div className="pd-result-label">{result.label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="pd-features">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="pd-features">Key Features</h2>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {project.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <li key={feature.title}>
                  <div className="pk-tile">
                    <FeatureIcon className="pd-feature-icon" aria-hidden="true" />
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pk-section" aria-labelledby="pd-tech">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="pd-tech">Technology Stack</h2>
          </div>
          <ul className="pk-grid" data-reveal data-reveal-stagger>
            {project.technologies.map((tech, i) => {
              const TechIcon = tech.icon;
              return (
                <li key={tech.name}>
                  <div className="pk-tile pd-tech">
                    <TechIcon className="pd-tech-icon" aria-hidden="true" />
                    <div>
                      <strong>{tech.name}</strong>
                      <span>{tech.purpose}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pk-section pk-section--sunk" aria-labelledby="pd-takeaways">
        <div className="pk-wrap">
          <div className="pk-head pk-head--solo" data-reveal>
            <h2 id="pd-takeaways">Key Takeaways</h2>
          </div>
          <ul className="pk-list pd-takeaways" data-reveal data-reveal-stagger>
            {project.keyTakeaways.map((takeaway, i) => (
              <li key={takeaway}>
                <FaCheck className="pd-takeaway-icon" aria-hidden="true" />
                <p>{takeaway}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.testimonial && (
        <section className="pk-section" aria-label="Testimonial">
          <div className="pk-wrap">
            <figure className="pk-tile pd-quote" data-reveal>
              <FaQuoteLeft className="pd-quote-icon" aria-hidden="true" />
              <blockquote className="pd-quote-text">{project.testimonial.quote}</blockquote>
              <figcaption className="pd-quote-author">
                <p className="pd-quote-name">{project.testimonial.author}</p>
                <p className="pd-quote-company">{project.testimonial.company}</p>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className={`pk-section${relatedSunk ? ' pk-section--sunk' : ''}`} aria-labelledby="pd-related">
          <div className="pk-wrap">
            <div className="pk-head pk-head--solo" data-reveal>
              <h2 id="pd-related">Related Projects</h2>
            </div>
            <ul className="pk-grid" data-reveal data-reveal-stagger>
              {relatedProjects.map((rp, i) => (
                <li key={rp.id}>
                  <Link to={`/portfolio/${rp.slug}`} className="pk-card pd-related brand-card">
                    <span className="pd-related-art"><CoverArt category={rp.category} seed={rp.id} /></span>
                    <span className="pd-related-body">
                      <span className="pk-meta">{rp.categoryLabel}</span>
                      <span className="pd-related-title">{rp.title}</span>
                      <span className="pd-related-desc">{rp.shortDescription}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pk-cta">
        <div className="pk-wrap">
          <div className="pk-cta-card" data-reveal>
            <div>
              <h2>Have a Similar Project in Mind?</h2>
              <p>Let's discuss how we can help bring your vision to life.</p>
            </div>
            <button type="button" onClick={() => navigate('/#contact')} className="pk-btn pk-btn--primary brand-btn-primary">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
