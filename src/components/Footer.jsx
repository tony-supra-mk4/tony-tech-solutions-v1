import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return <footer className="footer"><Link className="brand" to="/"><span className="brand-mark">TTS</span><span className="brand-name">Tony Tech Solutions</span></Link><p>{t('footer.services')}</p><p className="copyright">© {new Date().getFullYear()} TTS</p></footer>
}
