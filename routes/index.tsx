import Layout from "../components/Layout.tsx";
import Menu from "../components/Menu.tsx";

export default function Home() {
  return (
    <Layout
      title="OnsLand - Land Use In Europe"
      description="Interactive visualization comparing land use across European countries. Explore how different nations utilize their land for agriculture, nature, urban areas, and more."
      pageSpecificCss={["/home.css"]}
      pageSpecificScripts={["/home.js"]}
    >
      <header>
        <nav class="navbar">
          <div class="homepage-header">
            <div class="spacer"></div>
            <h1>
              <span class="title-full" data-i18n="homepage.heading">
                Land Use in Europe
              </span>
              <span class="title-short" data-i18n="homepage.headingShort">
                Land Use
              </span>
            </h1>
            <Menu showViewToggle />
          </div>
        </nav>
      </header>
      <main id="homepage" class="homepage-grid"></main>
    </Layout>
  );
}
