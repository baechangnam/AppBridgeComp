import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  companyInfo,
  footerLinks,
  metrics,
  portfolioFilters,
  portfolioProjects,
  projectTypes,
  serviceTabs,
  testimonials,
} from './data/company'
import './App.css'

type PortfolioProject = (typeof portfolioProjects)[number]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeServiceTab, setActiveServiceTab] = useState(serviceTabs[0].id)
  const [activePortfolioFilter, setActivePortfolioFilter] = useState(portfolioFilters[0].id)
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null)
  const [activeImage, setActiveImage] = useState('')
  const [formNotice, setFormNotice] = useState('')

  const filteredProjects = useMemo(
    () => portfolioProjects.filter((project) => project.category === activePortfolioFilter),
    [activePortfolioFilter],
  )

  const openProject = (project: PortfolioProject) => {
    setActiveProject(project)
    setActiveImage(project.gallery[0] ?? project.cover)
  }

  const closeProject = () => {
    setActiveProject(null)
    setActiveImage('')
  }

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormNotice('현재 정적 React 홈페이지라 문의 내용은 자동 전송되지 않습니다. 이메일 또는 전화로 직접 문의해주세요.')
  }

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
          <a className="brand" href="#top" aria-label="App Bridge 홈" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true">
              <img src="/web/ab_logo.png" alt="" />
            </span>
            <span className="brand-text">App Bridge</span>
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="주요 메뉴">
            <a href="#services" onClick={() => setMenuOpen(false)}>
              프로젝트1
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              회사소개
            </a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>
              구축 사례
            </a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>
              후기
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              고객지원
            </a>
          </nav>
          <a className="button button-primary nav-cta" href="#contact">
            상담신청
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">APP BUILDING STUDIO</p>
              <h1>앱 개발부터 운영까지 한번에</h1>
              <p className="hero-description">
                15년 이상의 실무 경험으로
                <br />
                실제 운영 가능한 서비스를 구축합니다.
              </p>
              <ul className="hero-points">
                <li>Android / iOS / Flutter / React</li>
                <li>관리자 시스템 + 서버 구축</li>
                <li>300건 이상의 앱 스토어 배포 및 운영 경험</li>
                <li>AI/LLM 기반 서비스 개발</li>
              </ul>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  문의하기
                </a>
                <a className="button button-secondary" href="#services">
                  서비스 안내
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-badge">
                <p>Product Strategy</p>
                <strong>기획부터 배포까지</strong>
              </div>
              <figure className="hero-image-shell">
                <img className="hero-image" src="/web/main.avif" alt="기획부터 배포까지 함께하는 App Bridge 개발팀" />
              </figure>
            </div>
          </div>
        </section>

        <section id="services" className="features section-light">
          <div className="container">
            <div className="section-heading centered">
              <p className="section-kicker">서비스 프로젝트</p>
              <h2>핵심 프로젝트</h2>
            </div>

            <div className="feature-tabs" role="tablist" aria-label="서비스 프로젝트 카테고리">
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
              <p className="section-kicker">성과 지표</p>
              <h2>성과로 증명하는 개발 파트너</h2>
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
              <p className="section-kicker">포트폴리오</p>
              <h2>구축 사례</h2>
            </div>

            <div className="portfolio-filters" role="tablist" aria-label="포트폴리오 카테고리">
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
            <button className="portfolio-modal-backdrop" type="button" aria-label="닫기" onClick={closeProject}></button>
            <div className="portfolio-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
              <button className="portfolio-modal-close" type="button" aria-label="닫기" onClick={closeProject}>
                ×
              </button>
              <div className="portfolio-modal-body">
                <div className="portfolio-modal-main">
                  <img src={activeImage} alt={activeProject.title} />
                  <div className="portfolio-mobile-gallery">
                    {activeProject.gallery.map((image, index) => (
                      <figure className="portfolio-mobile-shot" key={image}>
                        <img src={image} alt={`${activeProject.title} 상세 화면 ${index + 1}`} />
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
                        <img src={image} alt={`${activeProject.title} 상세 화면 ${index + 1}`} />
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
              <p className="section-kicker">고객 후기</p>
              <h2>실제 고객이 남긴 후기</h2>
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
                <p className="section-kicker">프로젝트 문의</p>
                <h2>프로젝트 상담</h2>
              </div>
              <p>
                프로젝트 상담은 언제든 환영합니다. <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
              <form className="contact-form" onSubmit={submitContact}>
                {formNotice && <p className="form-notice is-error">{formNotice}</p>}
                <label>
                  <span>이름</span>
                  <input type="text" name="name" placeholder="Your name" />
                </label>
                <label>
                  <span>이메일</span>
                  <input type="email" name="email" placeholder="email@website.com" />
                </label>
                <label>
                  <span>프로젝트 유형</span>
                  <select name="project_type" defaultValue={projectTypes[0]}>
                    {projectTypes.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>메시지</span>
                  <textarea name="message" rows={5} placeholder="Type your message..." />
                </label>
                <label className="checkbox">
                  <input type="checkbox" name="privacy" />
                  <span>개인정보 처리방침 동의</span>
                </label>
                <button type="submit" className="button button-primary button-block">
                  Submit
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
            <strong>회사명:</strong> {companyInfo.name}
          </p>
          <p>
            <strong>사업자번호:</strong> {companyInfo.businessNumber}
          </p>
          <p>
            <strong>연락처:</strong> <a href={`tel:${companyInfo.phone.replaceAll('-', '')}`}>{companyInfo.phone}</a>
          </p>
          <p>
            <strong>이메일:</strong> <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
