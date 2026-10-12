import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Cta, SectionHeading } from './Home'
import { PageHero } from './About'
import { projectCategories, projects } from '../data/projects'

function ProjectImage({ project, title, t }) {
  return <div
    className={`project-image project-image--${project.imageStyle}`}
    role="img"
    aria-label={t('work.imagePlaceholder', { title })}
  >
    <span>{t('work.placeholderLabel')}</span>
  </div>
}

function ProjectCard({ project, t }) {
  const content = t(`work.projects.${project.slug}`, { returnObjects: true })
  const title = content.title

  return <article className="project-card">
    <Link className="project-image-link" to={`/work/${project.slug}`} aria-label={`${t('work.viewDetails')}: ${title}`}>
      <ProjectImage project={project} title={title} t={t} />
    </Link>
    <div className="project-card-content">
      <p className="project-category">{t(`work.categories.${project.category}`)}</p>
      <h3><Link to={`/work/${project.slug}`}>{title}</Link></h3>
      <p className="project-description">{content.description}</p>
      <p className="project-placeholder-note">{t('work.placeholderNotice')}</p>
      <Link className="text-link" to={`/work/${project.slug}`}>{t('work.viewDetails')} <span>→</span></Link>
    </div>
  </article>
}

export default function Work() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const visibleProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory)

  return <>
    <PageHero data={t('work.hero', { returnObjects: true })} />
    <section className="section work-section">
      <SectionHeading label={t('work.sectionLabel')} title={t('work.sectionTitle')} text={t('work.sectionText')} />
      <div className="work-filters" role="group" aria-label={t('work.filterLabel')}>
        {projectCategories.map((category) => <button
          key={category}
          type="button"
          className={activeCategory === category ? 'active' : ''}
          aria-pressed={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        >
          {t(`work.categories.${category}`)}
        </button>)}
      </div>
      <div className="project-grid">
        {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} t={t} />)}
      </div>
    </section>
    <Cta title={t('work.cta.title')} text={t('work.cta.text')} />
  </>
}

export function ProjectDetail() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <section className="page-hero work-not-found">
      <p className="eyebrow">{t('work.detailLabel')}</p>
      <h1>{t('work.notFound.title')}</h1>
      <p>{t('work.notFound.text')}</p>
      <Link className="text-link" to="/work">{t('work.notFound.link')} <span>→</span></Link>
    </section>
  }

  const content = t(`work.projects.${project.slug}`, { returnObjects: true })
  return <>
    <PageHero data={{ label: t('work.detailLabel'), title: content.title, text: content.description }} />
    <section className="section project-detail">
      <ProjectImage project={project} title={content.title} t={t} />
      <div className="project-detail-copy">
        <p className="project-category">{t(`work.categories.${project.category}`)}</p>
        <p className="project-placeholder-note">{t('work.placeholderNotice')}</p>
        <h2>{t('work.detailHeading')}</h2>
        <p>{content.detail}</p>
        <Link className="text-link" to="/work">{t('work.backToWork')} <span>→</span></Link>
      </div>
    </section>
    <Cta title={t('work.cta.title')} text={t('work.cta.text')} />
  </>
}
