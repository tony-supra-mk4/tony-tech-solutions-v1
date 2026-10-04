import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const navItems = [['home', '/'], ['about', '/about'], ['services', '/services'], ['news', '/news'], ['contact', '/contact']]

export default function Header() {
  const { t, i18n } = useTranslation()
  return <header className="header"><Link className="brand" to="/" aria-label="Tony Tech Solutions home"><span className="brand-mark">TTS</span><span className="brand-name">Tony Tech Solutions</span></Link><div className="header-actions"><nav className="navigation" aria-label={t('navigation.label')}>{navItems.map(([name, path]) => <NavLink key={name} to={path} end={path === '/'}>{t(`navigation.${name}`)}</NavLink>)}</nav><div className="language-switcher" aria-label={t('navigation.language')}><button className={i18n.resolvedLanguage === 'en' ? 'active' : ''} onClick={() => i18n.changeLanguage('en')}>EN</button><span>/</span><button className={i18n.resolvedLanguage === 'vi' ? 'active' : ''} onClick={() => i18n.changeLanguage('vi')}>VI</button></div></div></header>
}
