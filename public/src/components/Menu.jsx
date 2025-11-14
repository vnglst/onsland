import { useState, useEffect } from 'preact/hooks';
import { useI18n } from '../hooks/useI18n.js';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';

export function Menu({ showViewToggle = false, onViewToggle, getViewToggleText }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { href: '/', key: 'menu.home', text: 'Home' },
    { href: '/rankings.html', key: 'menu.rankings', text: 'Rankings' },
    { href: '/about.html', key: 'menu.about', text: 'About' }
  ];

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleViewToggle = () => {
    if (onViewToggle) {
      onViewToggle();
    }
  };

  // Update body class when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  const handlePanelClick = (e) => {
    // Close menu when clicking the backdrop
    if (e.target.classList.contains('menu-panel')) {
      closeMenu();
    }
  };

  return (
    <div className="menu-container">
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`menu-panel ${isOpen ? 'open' : ''}`}
        onClick={handlePanelClick}
      >
        <div className="menu-content">
          {/* Navigation section */}
          <div className="menu-section">
            <h3>{t('menu.navigation')}</h3>
            {navLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                className="menu-link"
                onClick={closeMenu}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Language section */}
          <div className="menu-section">
            <h3>{t('menu.language')}</h3>
            <LanguageSwitcher className="language-switcher menu-language-switcher" />
          </div>

          {/* View toggle section (conditional) */}
          {showViewToggle && (
            <div className="menu-section menu-view-section">
              <h3>{t('menu.view')}</h3>
              <button
                className="menu-button menu-view-toggle"
                onClick={handleViewToggle}
              >
                {getViewToggleText ? getViewToggleText() : t('menu.toggleView')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
