import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import vi from './vi.json'

const initialization = i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { en: { translation: en }, vi: { translation: vi } }, fallbackLng: 'en', supportedLngs: ['en', 'vi'], interpolation: { escapeValue: false }, detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
})

function updateDocumentLanguage(language) {
  document.documentElement.lang = language
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('site.description', { lng: language }))
}

i18n.on('languageChanged', updateDocumentLanguage)
initialization.then(() => updateDocumentLanguage(i18n.resolvedLanguage || i18n.language))

export default i18n
