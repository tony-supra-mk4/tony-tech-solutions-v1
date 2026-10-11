import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Cta } from './Home'
import { PageHero } from './About'

const WHATSAPP_DESTINATION = 'https://wa.me/84703643399'

function createWhatsAppUrl(message) {
  const destination = new URL(WHATSAPP_DESTINATION)
  destination.searchParams.set('text', message)
  return destination.toString()
}

export default function Contact() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true })
  const [errors, setErrors] = useState({})
  const [preparedMessage, setPreparedMessage] = useState('')
  const [handoffFallback, setHandoffFallback] = useState(false)
  const [handoffStarted, setHandoffStarted] = useState(false)

  function handleChange(event) {
    const { name } = event.target
    setPreparedMessage('')
    setHandoffFallback(false)
    setHandoffStarted(false)
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const nextErrors = {}
    const name = values.name.trim()
    const company = values.company.trim()
    const email = values.email.trim()
    const service = values.service
    const message = values.message.trim()

    if (!name) nextErrors.name = t('contact.form.validation.nameRequired')
    if (!email) {
      nextErrors.email = t('contact.form.validation.emailRequired')
    } else if (form.elements.email.validity.typeMismatch) {
      nextErrors.email = t('contact.form.validation.emailInvalid')
    }
    if (!message) nextErrors.message = t('contact.form.validation.messageRequired')

    setErrors(nextErrors)
    setPreparedMessage('')
    if (Object.keys(nextErrors).length) return

    const lines = [
      `${t('contact.form.channel')}: ${t('contact.form.channels.whatsapp')}`,
      `${t('contact.form.name')}: ${name}`,
      company && `${t('contact.form.company')}: ${company}`,
      `${t('contact.form.email')}: ${email}`,
      service && `${t('contact.form.service')}: ${service}`,
      `${t('contact.form.message')}: ${message}`,
    ].filter(Boolean)
    const prepared = lines.join('\n')
    const popup = window.open(createWhatsAppUrl(prepared), '_blank')

    if (popup) popup.opener = null
    setHandoffFallback(!popup)
    setHandoffStarted(true)
    setPreparedMessage(prepared)
  }

  return <>
    <PageHero data={t('contact.hero', { returnObjects: true })} />
    <section className="section contact-layout">
      <div className="contact-details">
        <p className="eyebrow">{t('contact.info.label')}</p>
        <h2>{t('contact.info.title')}</h2>
        <p>{t('contact.info.text')}</p>
        <div><span>{t('contact.info.email')}</span><a href="mailto:hello@tonytechsolutions.com">hello@tonytechsolutions.com</a></div>
        <div><span>{t('contact.info.whatsapp')}</span><a href={WHATSAPP_DESTINATION} target="_blank" rel="noopener noreferrer">+84 70 364 3399</a></div>
      </div>
      <form className="contact-form" noValidate onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="contact-name">
          {t('contact.form.name')}
          <input id="contact-name" name="name" type="text" autoComplete="name" required aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} placeholder={t('contact.form.namePlaceholder')} />
          {errors.name && <span className="field-error" id="contact-name-error">{errors.name}</span>}
        </label>
        <label htmlFor="contact-company">
          {t('contact.form.company')}
          <input id="contact-company" name="company" type="text" autoComplete="organization" placeholder={t('contact.form.companyPlaceholder')} />
        </label>
        <label htmlFor="contact-email">
          {t('contact.form.email')}
          <input id="contact-email" name="email" type="email" autoComplete="email" required aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} placeholder={t('contact.form.emailPlaceholder')} />
          {errors.email && <span className="field-error" id="contact-email-error">{errors.email}</span>}
        </label>
        <label htmlFor="contact-service">
          {t('contact.form.service')}
          <select id="contact-service" name="service" defaultValue="">
            <option value="">{t('contact.form.servicePlaceholder')}</option>
            {services.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
          </select>
        </label>
        <div className="channel-fieldset">
          <span className="channel-label">{t('contact.form.channel')}</span>
          <span className="channel-value">{t('contact.form.channels.whatsapp')}</span>
        </div>
        <label htmlFor="contact-message">
          {t('contact.form.message')}
          <textarea id="contact-message" name="message" rows="5" required aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} placeholder={t('contact.form.messagePlaceholder')} />
          {errors.message && <span className="field-error" id="contact-message-error">{errors.message}</span>}
        </label>
        <p className="form-instructions">{t('contact.form.instructions')}</p>
        <button className="button button-primary" type="submit" disabled={handoffStarted}>
          {t(handoffStarted ? 'contact.form.prepared.button' : 'contact.form.button')} <span>→</span>
        </button>
        {preparedMessage && <div className="prepared-message" role="status">
          <h3>{t('contact.form.prepared.title')}</h3>
          <p>{t('contact.form.prepared.notice')}</p>
          {handoffFallback && <>
            <p>{t('contact.form.prepared.fallback')}</p>
            <a className="button button-primary" href={createWhatsAppUrl(preparedMessage)} target="_blank" rel="noopener noreferrer">
              {t('contact.form.prepared.openLink')} <span>→</span>
            </a>
          </>}
          <label htmlFor="prepared-inquiry">{t('contact.form.prepared.copyLabel')}<textarea id="prepared-inquiry" rows="7" readOnly value={preparedMessage} /></label>
        </div>}
      </form>
    </section>
    <section className="section map-section">
      <div><p className="eyebrow">{t('contact.location.label')}</p><h2>{t('contact.location.title')}</h2><p>{t('contact.location.text')}</p></div>
      <div className="map-placeholder"><span>TTS</span><p>{t('contact.location.mapPlaceholder')}</p></div>
    </section>
    <Cta title={t('contact.cta.title')} text={t('contact.cta.text')} />
  </>
}
