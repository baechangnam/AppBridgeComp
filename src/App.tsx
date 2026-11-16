import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { companyContent, contactNoticeCode, copy, getInitialLanguage, languageStorageKey } from './i18n'
import type { Language, NoticeCode } from './i18n'
import './App.css'

type PortfolioProject = (typeof companyContent.ko.portfolioProjects)[number]

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const t = copy[language]
  const { companyInfo, footerLinks, metrics, portfolioFilters, portfolioProjects, projectTypes, serviceTabs, testimonials } = companyContent[language]
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeServiceTab, setActiveServiceTab] = useState(serviceTabs[0].id)
  const [activePortfolioFilter, setActivePortfolioFilter] = useState(portfolioFilters[0].id)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const activeProject = portfolioProjects.find((project) => project.id === activeProjectId) ?? null
  const [activeImage, setActiveImage] = useState('')
  const [formNotice, setFormNotice] = useState<{ type: 'success' | 'error'; code: NoticeCode } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredProjects = useMemo(
    () => portfolioProjects.filter((project) => project.category === activePortfolioFilter),
    [activePortfolioFilter, portfolioProjects],
  )

  const openProject = (project: PortfolioProject) => {
    setActiveProjectId(project.id)
    setActiveImage(project.gallery[0] ?? project.cover)
  }

  const closeProject = () => {
    setActiveProjectId(null)
    setActiveImage('')
  }

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const privacy = formData.get('privacy') === 'on'

    if (!privacy) {
      setFormNotice({ type: 'error', code: 'privacy' })
      return
    }

    setIsSubmitting(true)
    setFormNotice(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
        body: JSON.stringify({
          language,
          name: formData.get('name'),
          email: formData.get('email'),
          projectType: formData.get('project_type'),
          message: formData.get('message'),
          privacy,
          website: formData.get('website'),
        }),
      })

      const result = (await response.json().catch(() => null)) as { code?: string } | null

      if (!response.ok) {
        setFormNotice({ type: 'error', code: contactNoticeCode(response.status, result?.code) })
        return
      }

      form.reset()
      setFormNotice({ type: 'success', code: 'success' })
    } catch {
      setFormNotice({
        type: 'error',
        code: 'failed',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem(languageStorageKey, language)
    } catch {
      // Storage may be disabled; retain the current selection in memory.
    }
    document.documentElement.lang = language
    document.title = t.meta.title
    const metadata = {
      'meta[name="description"]': t.meta.description,
      'meta[name="keywords"]': t.meta.keywords,
      'meta[property="og:title"]': t.meta.ogTitle,
      'meta[property="og:description"]': t.meta.ogDescription,
    }
    Object.entries(metadata).forEach(([selector, content]) => {
      document.querySelector(selector)?.setAttribute('content', content)
    })
  }, [language, t])

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProject])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProject()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <a className="brand" href="#top" aria-label={t.home} onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true">
              <img src="/web/ab_logo.png" alt="" />
            </span>
            <span className="brand-text">App Bridge</span>
          </a>
          <div className="language-switch" role="group" aria-label={t.language}>
            {(['ko', 'en'] as const).map((locale) => (
              <button
                key={locale}
                type="button"
                lang={locale}
                aria-label={locale === 'ko' ? '한국어' : 'English'}
                aria-pressed={language === locale}
                onClick={() => setLanguage(locale)}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label={t.navigation}>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              {t.projects}
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              {t.about}
            </a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>
              {t.portfolio}
            </a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>
              {t.reviews}
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              {t.support}
            </a>
          </nav>
          <a className="button button-primary nav-cta" href="#contact">
            {t.consultation}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">APP BUILDING STUDIO</p>
              <h1>{t.heroTitle}</h1>
              <p className="hero-description">
                {t.heroIntro}
                <br />
                {t.heroDescription}
              </p>
              <ul className="hero-points">
                <li>Android / iOS / Flutter / React</li>
                <li>{t.heroSystems}</li>
                <li>{t.heroExperience}</li>
                <li>{t.heroAI}</li>
              </ul>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  {t.contactUs}
                </a>
                <a className="button button-secondary" href="#services">
                  {t.services}
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-badge">
                <p>Product Strategy</p>
                <strong>{t.delivery}</strong>
              </div>
              <figure className="hero-image-shell">
                <img className="hero-image" src="/web/main.avif" alt={t.heroAlt} />
              </figure>
            </div>
          </div>
        </section>

        <section id="services" className="features section-light">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">{t.servicesKicker}</p>
              <h2>{t.servicesTitle}</h2>
            </div>

            <div className="feature-tabs" role="tablist" aria-label={t.serviceCategories}>
              {serviceTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`feature-tab${activeServiceTab === tab.id ? ' is-active' : ''}`}
                  type="button"
                  role="tab"
                  aria-selected={activeServiceTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveServiceTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {serviceTabs.map((tab) => (
              <div
                key={tab.id}
                className={`feature-panel${activeServiceTab === tab.id ? ' is-active' : ''}`}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${tab.id}`}
              >
                <article className="project-showcase">
                  <div className="project-copy">
                    <p className="project-eyebrow">{tab.eyebrow}</p>
                    <h3>{tab.title}</h3>
                    <p>{tab.description}</p>
                    <div className="project-list">
                      {tab.projects.map((project) => (
                        <article className="project-item" key={project.title}>
                          <h4>{project.title}</h4>
                          <ul className="project-points">
                            {project.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <p className="project-result">{project.result}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="project-media">
                    <div className="project-gallery">
                      {tab.gallery.map((image) => (
                        <figure className="project-shot" key={image.src}>
                          <img src={image.src} alt={image.alt} />
                        </figure>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="results">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">{t.metricsKicker}</p>
              <h2>{t.metricsTitle}</h2>
            </div>
            <div className="metric-grid">
              {metrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio section-light">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">{t.portfolioKicker}</p>
              <h2>{t.portfolio}</h2>
            </div>

            <div className="portfolio-filters" role="tablist" aria-label={t.portfolioCategories}>
              {portfolioFilters.map((filter) => (
                <button
                  key={filter.id}
                  className={`portfolio-filter${activePortfolioFilter === filter.id ? ' is-active' : ''}`}
                  type="button"
                  aria-pressed={activePortfolioFilter === filter.id}
                  onClick={() => setActivePortfolioFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="portfolio-grid">
              {filteredProjects.map((project) => (
                <button className="portfolio-card" type="button" key={project.id} onClick={() => openProject(project)}>
                  <figure>
                    <img src={project.cover} alt={project.title} />
                    <figcaption>
                      <div className="portfolio-copy">
                        <strong>{project.title}</strong>
                        <p>{project.summary}</p>
                      </div>
                      <span>{project.category.toUpperCase()}</span>
                    </figcaption>
                  </figure>
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeProject && (
          <div className="portfolio-modal">
            <button className="portfolio-modal-backdrop" type="button" aria-label={t.close} onClick={closeProject}></button>
            <div className="portfolio-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
              <button className="portfolio-modal-close" type="button" aria-label={t.close} onClick={closeProject}>
                ×
              </button>
              <div className="portfolio-modal-body">
                <div className="portfolio-modal-main">
                  <img src={activeImage} alt={activeProject.title} />
                  <div className="portfolio-mobile-gallery">
                    {activeProject.gallery.map((image, index) => (
                      <figure className="portfolio-mobile-shot" key={image}>
                        <img src={image} alt={`${activeProject.title} ${t.detailScreen} ${index + 1}`} />
                      </figure>
                    ))}
                  </div>
                </div>
                <div className="portfolio-modal-copy">
                  <p className="project-eyebrow">{activeProject.category.toUpperCase()}</p>
                  <h3 id="portfolio-modal-title">{activeProject.title}</h3>
                  <p>{activeProject.summary}</p>
                  <div className="portfolio-modal-thumbs">
                    {activeProject.gallery.map((image, index) => (
                      <button
                        className={`portfolio-thumb${activeImage === image ? ' is-active' : ''}`}
                        type="button"
                        key={image}
                        onClick={() => setActiveImage(image)}
                      >
                        <img src={image} alt={`${activeProject.title} ${t.detailScreen} ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section id="reviews" className="reviews section-light">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">{t.reviewsKicker}</p>
              <h2>{t.reviewsTitle}</h2>
              {t.reviewsNote && <p>{t.reviewsNote}</p>}
            </div>
            <div className="review-list">
              {testimonials.map((testimonial) => (
                <article className="review-card" key={`${testimonial.name}-${testimonial.date}`}>
                  <div className="review-head">
                    <span className="avatar" aria-hidden="true"></span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <div className="review-meta">
                        <span className="review-rating">★ {testimonial.rating}</span>
                        <span>{testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-body">
                    {testimonial.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container contact-grid contact-grid-single">
            <div className="contact-copy">
              <div className="section-heading centered contact-heading">
                <p className="section-kicker">{t.contactKicker}</p>
                <h2>{t.contactTitle}</h2>
              </div>
              <p>
                {t.contactIntro} <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
              <form className="contact-form" onSubmit={submitContact}>
                {formNotice && (
                  <p role="status" className={`form-notice${formNotice.type === 'error' ? ' is-error' : ''}`}>{t.notices[formNotice.code]}</p>
                )}
                <input className="honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" />
                <label>
                  <span>{t.name}</span>
                  <input type="text" name="name" placeholder={t.namePlaceholder} required />
                </label>
                <label>
                  <span>{t.email}</span>
                  <input type="email" name="email" placeholder="email@website.com" required />
                </label>
                <label>
                  <span>{t.projectType}</span>
                  <select name="project_type" defaultValue={companyContent.ko.projectTypes[0]}>
                    {projectTypes.map((type, index) => (
                      <option value={companyContent.ko.projectTypes[index]} key={companyContent.ko.projectTypes[index]}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>{t.message}</span>
                  <textarea name="message" rows={5} placeholder={t.messagePlaceholder} required />
                </label>
                <label className="checkbox">
                  <input type="checkbox" name="privacy" required />
                  <span>{t.privacy}</span>
                </label>
                <button type="submit" className="button button-primary button-block" disabled={isSubmitting}>
                  {isSubmitting ? t.sending : t.send}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <p>© 2025 App Bridge. All rights reserved.</p>
          <a className="footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              <img src="/web/ab_logo.png" alt="" />
            </span>
            <span>App Bridge</span>
          </a>
          <div className="footer-links">
            {footerLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer noopener" key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="container footer-meta">
          <p>
            <strong>{t.company}:</strong> {companyInfo.name}
          </p>
          <p>
            <strong>{t.businessNumber}:</strong> {companyInfo.businessNumber}
          </p>
          <p>
            <strong>{t.phone}:</strong> <a href={`tel:${companyInfo.phone.replaceAll('-', '')}`}>{companyInfo.phone}</a>
          </p>
          <p>
            <strong>{t.email}:</strong> <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
