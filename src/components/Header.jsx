import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../data/content.js";

function SmartLink({ href, className, onClick, children }) {
  if (href?.startsWith("/")) {
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  }

  return <a href={href || "#"} className={className} onClick={onClick}>{children}</a>;
}

function MegaMenuPanel({ menu, closeMegaMenu }) {
  return (
    <div className="mega-menu-panel">
      <div className="mega-menu-panel-inner">
        <div className="mega-menu-copy">
          <SmartLink href={menu.headingHref} className="mega-menu-heading" onClick={closeMegaMenu}>
            {menu.heading}
          </SmartLink>
          <div className="mega-menu-links">
            {menu.links.map((link) => (
              <SmartLink href={link.href} className="mega-menu-link" key={link.key} onClick={closeMegaMenu}>
                {link.label}
              </SmartLink>
            ))}
          </div>
        </div>
        <SmartLink href={menu.feature.href} className="mega-menu-media" onClick={closeMegaMenu}>
          <img src={menu.feature.image || assets.categoryRods} alt={menu.feature.alt} />
          <div className="mega-menu-media-copy">
            <span>{menu.feature.eyebrow}</span>
            <strong>{menu.feature.title}</strong>
          </div>
        </SmartLink>
      </div>
    </div>
  );
}

export function Header({
  t,
  navItems,
  cartCount,
  lang,
  otherLang,
  setLang,
  setSearchOpen,
  setCartOpen,
}) {
  const location = useLocation();
  const [activeMegaMenuKey, setActiveMegaMenuKey] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileOpenKey, setMobileOpenKey] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const pendingMegaMenuKey = useRef(null);
  const hoverDelay = 180;

  useEffect(() => () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const scheduleMegaMenuOpen = (key) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    pendingMegaMenuKey.current = key;
    openTimer.current = window.setTimeout(() => setActiveMegaMenuKey(pendingMegaMenuKey.current), hoverDelay);
  };

  const scheduleMegaMenuClose = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    pendingMegaMenuKey.current = null;
    closeTimer.current = window.setTimeout(() => setActiveMegaMenuKey(null), hoverDelay);
  };

  const closeMegaMenuImmediately = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    pendingMegaMenuKey.current = null;
    setActiveMegaMenuKey(null);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    setMobileOpenKey(null);
  };

  const openMobileNav = () => {
    closeMegaMenuImmediately();
    setMobileOpenKey(null);
    setMobileNavOpen(true);
  };

  useEffect(() => {
    closeMegaMenuImmediately();
  }, [location.pathname]);

  return (
    <>
      <header className="site-header" data-mega-open={activeMegaMenuKey ? "true" : undefined}>
        <div className="site-header-inner">
          <button className="mobile-menu" onClick={openMobileNav} aria-label="Open menu">☰</button>
          <Link className="brand" to="/" aria-label={t.brand}>
            <img className="brand-logo" src={assets.aoraceLogo} alt="Aorace" />
          </Link>
          <nav className="main-nav" aria-label="Main menu">
            {navItems.map((item) => item.megaMenu ? (
              <div
                className={activeMegaMenuKey === item.key ? "nav-item has-mega open" : "nav-item has-mega"}
                key={item.key}
                onMouseEnter={() => scheduleMegaMenuOpen(item.key)}
                onMouseLeave={scheduleMegaMenuClose}
              >
                <SmartLink
                  href={item.href}
                  className="nav-trigger"
                  onClick={closeMegaMenuImmediately}
                >
                  <span>{item.label}</span>
                  <span className="nav-chevron" aria-hidden="true">▾</span>
                </SmartLink>
                <MegaMenuPanel menu={item.megaMenu} closeMegaMenu={closeMegaMenuImmediately} />
              </div>
            ) : (
              <div className="nav-item" key={item.key}>
                <SmartLink href={item.href} className="nav-link">{item.label}</SmartLink>
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className={lang === "en" ? "lang-button show-en" : "lang-button show-zh"}
              onClick={() => setLang(otherLang)}
              aria-label={lang === "en" ? "Switch to Chinese" : "Switch to English"}
            >
              <span className="lang-track" aria-hidden="true" />
              <span className="lang-label en">EN</span>
              <span className="lang-label zh">中文</span>
            </button>
            <button className="plain-icon" onClick={() => setSearchOpen(true)} aria-label={t.search}>⌕</button>
            <button className="account-link">{t.account}</button>
            <button className="cart-link" onClick={() => setCartOpen(true)}>{`${t.cart} ${cartCount}`}</button>
          </div>
        </div>
      </header>
      <div
        className={mobileNavOpen ? "mobile-nav-overlay open" : "mobile-nav-overlay"}
        onClick={closeMobileNav}
      />
      <aside className={mobileNavOpen ? "mobile-nav open" : "mobile-nav"}>
        <button className="mobile-nav-close" onClick={closeMobileNav}>{t.close}</button>
        <img className="mobile-nav-logo" src={assets.aoraceLogo} alt="Aorace" />
        <nav aria-label="Mobile menu">
          {navItems.map((item) => item.megaMenu ? (
            <div className="mobile-nav-item has-children" key={item.key}>
              <button
                type="button"
                className={mobileOpenKey === item.key ? "mobile-nav-toggle open" : "mobile-nav-toggle"}
                aria-expanded={mobileOpenKey === item.key}
                onClick={() => setMobileOpenKey((current) => current === item.key ? null : item.key)}
              >
                <span>{item.label}</span>
                <span className="mobile-chevron" aria-hidden="true">⌄</span>
              </button>
              <div className={mobileOpenKey === item.key ? "mobile-submenu open" : "mobile-submenu"}>
                <div className="mobile-submenu-inner">
                  <SmartLink href={item.megaMenu.headingHref} className="mobile-submenu-primary" onClick={closeMobileNav}>
                    {item.megaMenu.heading}
                  </SmartLink>
                  {item.megaMenu.links.map((link) => (
                    <SmartLink href={link.href} key={link.key} onClick={closeMobileNav}>
                      {link.label}
                    </SmartLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <SmartLink href={item.href} key={item.key} onClick={closeMobileNav}>
              {item.label}
            </SmartLink>
          ))}
          <button
            type="button"
            className="mobile-nav-search"
            onClick={() => {
              closeMobileNav();
              setSearchOpen(true);
            }}
          >
            {t.search}
          </button>
        </nav>
      </aside>
    </>
  );
}
