import { useSignal, useSignalEffect } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface MenuProps {
  showViewToggle?: boolean;
  viewToggleText?: string;
  onViewToggle?: () => void;
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

export default function Menu(
  { showViewToggle = false, viewToggleText = "", onViewToggle }: MenuProps,
) {
  const isOpen = useSignal(false);
  const currentLang = useSignal("en");
  const translations = useSignal<Record<string, string>>({});

  // Load translations from window object
  useEffect(() => {
    if (typeof window !== "undefined") {
      translations.value = (window as any).__TRANSLATIONS__ || {};
      currentLang.value = (window as any).__LANG__ || "en";
    }
  }, []);

  const t = (key: string): string => {
    return translations.value[key] || key;
  };

  const closeMenu = () => {
    isOpen.value = false;
    if (typeof document !== "undefined") {
      document.body.classList.remove("menu-open");
    }
  };

  const openMenu = () => {
    isOpen.value = true;
    if (typeof document !== "undefined") {
      document.body.classList.add("menu-open");
    }
  };

  const handleLanguageChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    const newLang = select.value;

    if (typeof window !== "undefined") {
      // Store in localStorage
      localStorage.setItem("language", newLang);

      // Reload translations
      fetch(`/locales/${newLang}.json`)
        .then((response) => response.json())
        .then((data) => {
          // Flatten translations
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

          translations.value = flat;
          currentLang.value = newLang;
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
    }
  };

  const handleViewToggle = () => {
    if (onViewToggle) {
      onViewToggle();
    }
  };

  // Handle click outside to close menu
  useEffect(() => {
    if (typeof document === "undefined") return;

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

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <button
        class="hamburger"
        aria-label="Menu"
        onClick={(e) => {
          e.stopPropagation();
          isOpen.value ? closeMenu() : openMenu();
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
          onClick={closeMenu}
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
            value={currentLang.value}
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
              {viewToggleText}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
