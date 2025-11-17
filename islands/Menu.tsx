import { useSignal } from "@preact/signals";

interface MenuProps {
  showViewToggle?: boolean;
}

const NAV_LINKS = [
  { href: "/", key: "menu.home", text: "Home" },
  { href: "/rankings", key: "menu.rankings", text: "Rankings" },
  { href: "/about", key: "menu.about", text: "About" },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
];

export default function Menu({ showViewToggle = false }: MenuProps) {
  const isOpen = useSignal(false);

  const t = (key: string): string => {
    if (typeof window === "undefined") return key;
    const translations = (window as any).__TRANSLATIONS__ || {};
    return translations[key] || key;
  };

  const getCurrentLang = (): string => {
    if (typeof window === "undefined") return "en";
    return (window as any).__LANG__ || "en";
  };

  const closeMenu = () => {
    isOpen.value = false;
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    isOpen.value = true;
    document.body.classList.add("menu-open");
  };

  const handleLanguageChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    const newLang = select.value;

    localStorage.setItem("language", newLang);

    fetch(`/locales/${newLang}.json`)
      .then((response) => response.json())
      .then((data) => {
        const flat: Record<string, string> = {};
        function flatten(obj: any, prefix = "") {
          for (const key in obj) {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === "object" && value !== null) {
              flatten(value, newKey);
            } else {
              flat[newKey] = value;
            }
          }
        }
        flatten(data);

        (window as any).__TRANSLATIONS__ = flat;
        (window as any).__LANG__ = newLang;

        // Update all data-i18n elements
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const key = el.getAttribute("data-i18n");
          if (key) {
            el.textContent = flat[key] || key;
          }
        });

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent("languageChanged"));
      });
  };

  const handleViewToggle = () => {
    if (typeof window !== "undefined") {
      if ((window as any).toggleView) {
        (window as any).toggleView();
      } else if ((window as any).toggleLayout) {
        (window as any).toggleLayout();
      }
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      isOpen.value &&
      !target.closest(".menu-panel") &&
      !target.closest(".hamburger")
    ) {
      closeMenu();
    }
  };

  return (
    <>
      <button
        class="hamburger"
        aria-label="Menu"
        onClick={(e) => {
          e.stopPropagation();
          if (!isOpen.value) {
            openMenu();
            document.addEventListener("click", handleClickOutside);
          } else {
            closeMenu();
            document.removeEventListener("click", handleClickOutside);
          }
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class={`menu-panel ${isOpen.value ? "open" : ""}`}>
        <button
          class="menu-close"
          aria-label="Close menu"
          onClick={() => {
            closeMenu();
            document.removeEventListener("click", handleClickOutside);
          }}
        >
          ×
        </button>

        {/* Navigation Section */}
        <div class="menu-section">
          <h3 data-i18n="menu.navigation">{t("menu.navigation")}</h3>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class="menu-link"
              data-i18n={link.key}
              onClick={closeMenu}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Language Section */}
        <div class="menu-section">
          <h3 data-i18n="menu.language">{t("menu.language")}</h3>
          <select
            class="language-switcher menu-language-switcher"
            title="Select language"
            value={getCurrentLang()}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle Section */}
        {showViewToggle && (
          <div class="menu-section menu-view-section">
            <h3 data-i18n="menu.view">{t("menu.view")}</h3>
            <button
              class="menu-button menu-view-toggle"
              id="menuViewToggle"
              onClick={handleViewToggle}
            >
            </button>
          </div>
        )}
      </div>
    </>
  );
}
