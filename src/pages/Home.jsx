import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Arrow = () => <span>→</span>
export default function Home() {
  const { t } = useTranslation(); const services = t('services.items', { returnObjects: true }); const news = t('news.items', { returnObjects: true }).slice(0, 2)
  return <><section className="hero"><div className="hero-copy"><p className="eyebrow">{t('home.hero.label')}</p><h1>{t('home.hero.title')} <span>{t('home.hero.highlight')}</span></h1><p className="hero-description">{t('home.hero.description')}</p><div className="button-group"><Link className="button button-primary" to="/contact">{t('buttons.getInTouch')} <Arrow /></Link><Link className="button button-secondary" to="/services">{t('buttons.ourServices')}</Link></div></div><Visual /></section>
  <section className="section intro"><p className="eyebrow">{t('home.intro.label')}</p><h2>{t('home.intro.title')}</h2><p>{t('home.intro.text')}</p></section>
  <section className="services section"><SectionHeading label={t('services.label')} title={t('home.servicesTitle')} text={t('home.servicesDescription')} /><div className="service-grid">{services.map((s, i) => <ServiceCard key={s.title} service={s} number={i + 1} />)}</div><Link className="text-link" to="/services">{t('buttons.viewAllServices')} <Arrow /></Link></section>
  <section className="about section"><div><p className="eyebrow">{t('home.why.label')}</p><h2>{t('home.why.title')}</h2></div><div className="about-copy"><p className="about-lead">{t('home.why.lead')}</p><p>{t('home.why.text')}</p><Link className="text-link" to="/about">{t('buttons.learnMore')} <Arrow /></Link></div></section>
  <section className="section news-preview"><SectionHeading label={t('home.newsLabel')} title={t('home.newsTitle')} /><div className="article-grid">{news.map((article) => <ArticleCard key={article.title} article={article} />)}</div></section>
  <Cta title={t('home.cta.title')} text={t('home.cta.text')} /></>
}
export function Visual() { return <div className="hero-visual" aria-hidden="true"><div className="orb orb-one"/><div className="orb orb-two"/><div className="grid-panel"><span className="panel-label">TTS / 01</span><div className="panel-line panel-line-one"/><div className="panel-line panel-line-two"/><div className="panel-dot"/></div></div> }
export function SectionHeading({ label, title, text }) { return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2>{text && <p>{text}</p>}</div> }
export function ServiceCard({ service, number }) { return <article className={`service-card${service.offerings ? ' service-card-design' : ''}`}><span className="service-number">0{number}</span><h3>{service.title}</h3><p>{service.description}</p><span className="card-arrow">↗</span></article> }
export function ArticleCard({ article }) { return <article className="article-card"><p className="article-meta">{article.category} · {article.date}</p><h3>{article.title}</h3><p>{article.excerpt}</p><span className="card-arrow">↗</span></article> }
export function Cta({ title, text }) { const { t } = useTranslation(); return <section className="contact section"><p className="eyebrow">{t('cta.label')}</p><h2>{title}</h2>{text && <p>{text}</p>}<Link className="button button-light" to="/contact">{t('buttons.getInTouch')} <Arrow /></Link></section> }
