import { useTranslation } from 'react-i18next'
import { Cta, SectionHeading } from './Home'
import { PageHero } from './About'

export default function Services() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true })

  return <>
    <PageHero data={t('services.hero', { returnObjects: true })} />
    <section className="section">
      <SectionHeading label={t('services.label')} title={t('services.overviewTitle')} text={t('services.overviewText')} />
      <div className="service-detail-list">
        {services.map((service, index) => <article key={service.title}>
          <span className="service-number">0{index + 1}</span>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <span className="card-arrow">↗</span>
          {service.offerings && <div className="service-offerings">
            {service.offerings.map((offering) => <section key={offering.title}>
              <h3>{offering.title}</h3>
              <p>{offering.description}</p>
            </section>)}
          </div>}
        </article>)}
      </div>
    </section>
    <Cta title={t('services.cta.title')} text={t('services.cta.text')} />
  </>
}
