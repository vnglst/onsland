import { PageProps } from "$fresh/server.ts";
import Layout from "../../components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";

export default function Country({ params }: PageProps) {
  const country = params.country;

  return (
    <Layout
      title={`Land Use - OnsLand`}
      description="Interactive visualization of land use showing agriculture, nature, urban areas, and more."
      pageSpecificCss={["/country.css"]}
      pageSpecificScripts={[
        "/shared/translation-utils.js",
        "/country.js",
      ]}
    >
      {/* Pass country to client-side script via data attribute */}
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__COUNTRY__ = "${country}";`,
          }}
        />
      </Head>

      <header>
        <nav class="navbar">
          <div id="countryHeader">
            <a href="/" class="back-button">
              <span class="back-text-full">
                <span data-i18n="common.back">Back</span>
              </span>
              <span class="back-text-short" data-i18n="common.backShort">
                ←
              </span>
            </a>
            <h1 id="countryTitle">
              <span class="title-prefix" data-i18n="country.titlePrefix">
                Land Use in{" "}
              </span>
              <span class="title-country"></span>
            </h1>
            {/* Hamburger menu will be added here by menu.js */}
          </div>
        </nav>
      </header>

      <main>
        <svg
          id="countrySvg"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid"
        >
        </svg>

        <div id="rankingsInfo" class="rankings-info">
          {/* Rankings information will be dynamically inserted here */}
        </div>
      </main>
    </Layout>
  );
}
