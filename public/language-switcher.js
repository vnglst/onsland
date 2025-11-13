// Language Switcher Component
// Creates an SVG-based language toggle button

function createLanguageSwitcher() {
  const container = document.createElement('div');
  container.className = 'language-switcher';
  container.setAttribute('aria-label', 'Language selector');

  const currentLang = i18n.getCurrentLanguage();

  // Create SVG container
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 60 32');
  svg.setAttribute('width', '60');
  svg.setAttribute('height', '32');
  svg.classList.add('language-switcher-svg');

  // Background rounded rectangle
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('x', '0');
  bg.setAttribute('y', '0');
  bg.setAttribute('width', '60');
  bg.setAttribute('height', '32');
  bg.setAttribute('rx', '16');
  bg.setAttribute('fill', 'rgba(255, 255, 255, 0.1)');
  bg.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
  bg.setAttribute('stroke-width', '1');
  svg.appendChild(bg);

  // EN button
  const enGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  enGroup.classList.add('lang-option');
  enGroup.setAttribute('data-lang', 'en');
  if (currentLang === 'en') enGroup.classList.add('active');

  const enBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  enBg.setAttribute('x', '2');
  enBg.setAttribute('y', '2');
  enBg.setAttribute('width', '26');
  enBg.setAttribute('height', '28');
  enBg.setAttribute('rx', '14');
  enBg.setAttribute('fill', currentLang === 'en' ? 'rgba(255, 255, 255, 0.2)' : 'transparent');
  enBg.classList.add('lang-bg');
  enGroup.appendChild(enBg);

  const enText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  enText.setAttribute('x', '15');
  enText.setAttribute('y', '21');
  enText.setAttribute('text-anchor', 'middle');
  enText.setAttribute('fill', 'var(--text-light)');
  enText.setAttribute('font-size', '12');
  enText.setAttribute('font-weight', '600');
  enText.textContent = 'EN';
  enGroup.appendChild(enText);

  svg.appendChild(enGroup);

  // NL button
  const nlGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  nlGroup.classList.add('lang-option');
  nlGroup.setAttribute('data-lang', 'nl');
  if (currentLang === 'nl') nlGroup.classList.add('active');

  const nlBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  nlBg.setAttribute('x', '32');
  nlBg.setAttribute('y', '2');
  nlBg.setAttribute('width', '26');
  nlBg.setAttribute('height', '28');
  nlBg.setAttribute('rx', '14');
  nlBg.setAttribute('fill', currentLang === 'nl' ? 'rgba(255, 255, 255, 0.2)' : 'transparent');
  nlBg.classList.add('lang-bg');
  nlGroup.appendChild(nlBg);

  const nlText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  nlText.setAttribute('x', '45');
  nlText.setAttribute('y', '21');
  nlText.setAttribute('text-anchor', 'middle');
  nlText.setAttribute('fill', 'var(--text-light)');
  nlText.setAttribute('font-size', '12');
  nlText.setAttribute('font-weight', '600');
  nlText.textContent = 'NL';
  nlGroup.appendChild(nlText);

  svg.appendChild(nlGroup);

  container.appendChild(svg);

  // Add click handlers
  enGroup.addEventListener('click', () => switchLanguage('en'));
  nlGroup.addEventListener('click', () => switchLanguage('nl'));

  // Add hover effects
  enGroup.style.cursor = 'pointer';
  nlGroup.style.cursor = 'pointer';

  return container;
}

async function switchLanguage(lang) {
  if (lang === i18n.getCurrentLanguage()) return;

  // Show loading state (optional)
  await i18n.changeLanguage(lang);
}

// Initialize language switcher on page load
function initLanguageSwitcher() {
  // Find the header and add the language switcher
  const header = document.querySelector('header');
  if (header) {
    const switcher = createLanguageSwitcher();

    // Insert after the header content
    const headerContent = header.querySelector('.homepage-header, #countryHeader');
    if (headerContent) {
      headerContent.appendChild(switcher);
    } else {
      header.appendChild(switcher);
    }
  }
}

// Export for use in HTML pages
window.initLanguageSwitcher = initLanguageSwitcher;
