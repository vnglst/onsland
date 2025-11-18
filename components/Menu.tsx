interface MenuProps {
  showViewToggle?: boolean;
}

const NAV_LINKS = [
  { href: "/", key: "menu.home" },
  { href: "/rankings", key: "menu.rankings" },
  { href: "/about", key: "menu.about" },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
];

export default function Menu({ showViewToggle = false }: MenuProps) {
  return (
    <>
      <button type="button" class="hamburger" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="menu-panel">
        <button type="button" class="menu-close" aria-label="Close menu">
          ×
        </button>

        {/* Navigation Section */}
        <div class="menu-section">
          <h3 data-i18n="menu.navigation">Navigation</h3>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class="menu-link"
              data-i18n={link.key}
            >
              {link.key}
            </a>
          ))}
        </div>

        {/* Language Section */}
        <div class="menu-section">
          <h3 data-i18n="menu.language">Language</h3>
          <select
            class="language-switcher menu-language-switcher"
            title="Select language"
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                selected={lang.code === "en"}
              >
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle Section */}
        {showViewToggle && (
          <div class="menu-section menu-view-section">
            <h3 data-i18n="menu.view">View</h3>
            <button
              type="button"
              class="menu-button menu-view-toggle"
              id="menuViewToggle"
            >
            </button>
          </div>
        )}
      </div>
    </>
  );
}
