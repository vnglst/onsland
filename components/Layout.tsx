import { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";

interface LayoutProps {
  title: string;
  description: string;
  children: ComponentChildren;
  pageSpecificCss?: string[];
  pageSpecificScripts?: string[];
  inlineScript?: string;
}

export default function Layout({
  title,
  description,
  children,
  pageSpecificCss = [],
  pageSpecificScripts = [],
  inlineScript = "",
}: LayoutProps) {
  const baseUrl = "https://onsland.koenvangilst.nl";

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={baseUrl} />

        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${baseUrl}/assets/og-image.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={baseUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`${baseUrl}/assets/twitter-image.png`}
        />

        {/* Fonts */}
        <link rel="stylesheet" href="/fonts/ibm-plex-sans.css" />

        {/* Base CSS */}
        <link rel="stylesheet" href="/shared/base.css" />
        <link rel="stylesheet" href="/shared/menu.css" />

        {/* Page-specific CSS */}
        {pageSpecificCss.map((css) => (
          <link key={css} rel="stylesheet" href={css} />
        ))}

        {/* Analytics */}
        <script
          defer
          data-domain="onsland.koenvangilst.nl"
          src="https://plausible.koenvangilst.nl/js/script.js"
        />

        {/* Vendor libraries */}
        <script src="/vendor/d3.v7.min.js" />
        <script src="/vendor/d3-hexbin.v0.2.min.js" />
        <script src="/vendor/topojson-client.v3.min.js" />

        {/* Shared scripts */}
        <script src="/shared/i18n.js" />

        {/* Inline script if provided */}
        {inlineScript && (
          <script
            dangerouslySetInnerHTML={{
              __html: inlineScript,
            }}
          />
        )}
      </Head>

      {children}

      <Footer />

      {/* Common scripts that need to be at the end */}
      <script src="/shared/menu.js" />
      <script src="/shared/countries.js" />
      <script src="/shared/render.js" />
      <script src="/shared/page-init.js" />

      {/* Page-specific scripts */}
      {pageSpecificScripts.map((script) => (
        <script key={script} src={script} />
      ))}
    </>
  );
}

function Footer() {
  return (
    <footer class="page-footer">
      <div class="footer-content">
        <div>
          <span data-i18n="common.data">Data</span>:{" "}
          <a
            target="_blank"
            href="https://ec.europa.eu/eurostat/databrowser/view/lan_lcv_ovw/default/table"
          >
            Eurostat Land Cover
          </a>
          {" | "}
          <span data-i18n="common.code">Code</span>:{" "}
          <a target="_blank" href="https://github.com/vnglst/onsland">
            Github
          </a>
        </div>
        <div>
          <span data-i18n="common.visualisationBy">Visualisation by</span>{" "}
          <a
            target="_blank"
            href="https://koenvangilst.nl/lab/european-land-use"
          >
            Koen van Gilst
          </a>
        </div>
      </div>
    </footer>
  );
}
