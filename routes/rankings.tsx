import Layout from "../components/Layout.tsx";
import Menu from "../islands/Menu.tsx";

export default function Rankings() {
  return (
    <Layout
      title="Land Use Rankings - OnsLand"
      description="Rankings of European countries by land use categories - which countries have the most water, woodland, urban areas, and more."
      pageSpecificCss={["/rankings.css"]}
      pageSpecificScripts={[
        "/shared/translation-utils.js",
        "/rankings.js",
      ]}
    >
      <header>
        <nav class="navbar">
          <div class="homepage-header">
            <a href="/" class="back-button">
              <span class="back-text-full">
                <span data-i18n="common.back">Back</span>
              </span>
              <span class="back-text-short" data-i18n="common.backShort">
                ←
              </span>
            </a>
            <h1>
              <span class="title-full" data-i18n="rankings.heading">
                Land Use Rankings
              </span>
              <span class="title-short" data-i18n="rankings.headingShort">
                Rankings
              </span>
            </h1>
            <Menu />
          </div>
        </nav>
      </header>

      <main class="rankings-container" id="rankingsContainer">
        {/* Rankings will be dynamically generated here */}
      </main>
    </Layout>
  );
}
