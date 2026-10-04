import { useTranslation } from 'react-i18next'
import { Cta, SectionHeading } from './Home'
import { PageHero } from './About'
export default function Services() { const { t } = useTranslation(); const services = t('services.items', { returnObjects: true }); return <><PageHero data={t('services.hero', { returnObjects: true })} /><section className="section"><SectionHeading label={t('services.label')} title={t('services.overviewTitle')} text={t('services.overviewText')} /><div className="service-detail-list">{services.map((s, i) => <article key={s.title}><span className="service-number">0{i + 1}</span><h2>{s.title}</h2><p>{s.description}</p><span className="card-arrow">↗</span></article>)}</div></section><Cta title={t('services.cta.title')} text={t('services.cta.text')} /></> }
