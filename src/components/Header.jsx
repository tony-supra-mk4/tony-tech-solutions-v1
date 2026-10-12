import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const navItems = [['home', '/'], ['about', '/about'], ['services', '/services'], ['work', '/work'], ['news', '/news'], ['contact', '/contact']]

function NavigationLinks({ t, onNavigate }) {
  return navItems.map(([name, path]) => <NavLink key={name} to={path} end={path === '/'} onClick={onNavigate}>{t(`navigation.${name}`)}</NavLink>)
}

function LanguageSwitcher({ t, i18n, onChange }) {
  return <div className="language-switcher" aria-label={t('navigation.language')}>
    <button type="button" className={i18n.resolvedLanguage === 'en' ? 'active' : ''} aria-pressed={i18n.resolvedLanguage === 'en'} onClick={() => { i18n.changeLanguage('en'); onChange() }}>EN</button>
    <span>/</span>
    <button type="button" className={i18n.resolvedLanguage === 'vi' ? 'active' : ''} aria-pressed={i18n.resolvedLanguage === 'vi'} onClick={() => { i18n.changeLanguage('vi'); onChange() }}>VI</button>
  </div>
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const menuId = 'mobile-navigation'

  useEffect(() => {
    if (!menuOpen) return undefined

    function handlePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false)
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px)')
    const handleBreakpointChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    desktopQuery.addEventListener('change', handleBreakpointChange)
    return () => desktopQuery.removeEventListener('change', handleBreakpointChange)
  }, [])

  return <header className="header" ref={headerRef}>
    <Link className="brand" to="/" aria-label={t('navigation.brandHome')}>
      <span className="brand-mark">TTS</span>
      <span className="brand-name">Tony Tech Solutions</span>
    </Link>
    <div className="header-actions desktop-header-actions">
      <nav className="navigation" aria-label={t('navigation.label')}>
        <NavigationLinks t={t} />
      </nav>
      <LanguageSwitcher t={t} i18n={i18n} onChange={() => {}} />
    </div>
    <button
      ref={toggleRef}
      className="mobile-menu-toggle"
      type="button"
      aria-label={t(menuOpen ? 'navigation.closeMenu' : 'navigation.openMenu')}
      aria-expanded={menuOpen}
      aria-controls={menuId}
      onClick={() => setMenuOpen((open) => !open)}
    >
      <span className="hamburger-icon" aria-hidden="true"><span /><span /><span /></span>
    </button>
    <div id={menuId} className={`mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
      <nav className="mobile-navigation" aria-label={t('navigation.label')}>
        <NavigationLinks t={t} onNavigate={() => setMenuOpen(false)} />
      </nav>
      <LanguageSwitcher t={t} i18n={i18n} onChange={() => setMenuOpen(false)} />
    </div>
  </header>
}
