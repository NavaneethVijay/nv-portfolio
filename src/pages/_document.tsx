import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sai Navaneeth V",
    alternateName: "Navaneeth Vijay",
    jobTitle: "Solution Architect & AI Engineer",
    url: "https://www.navaneethvijay.in/",
    sameAs: [
      "https://github.com/NavaneethVijay",
      "https://www.linkedin.com/in/sai-navaneeth-v/",
      "https://twitter.com/navaneeth_V29",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "BNM Institute of Technology, Bengaluru",
    },
    knowsAbout: [
      "Solution Architecture",
      "Applied Artificial Intelligence",
      "Next.js",
      "React Native",
      "Hono.js",
      "Drizzle ORM",
      "Supabase",
      "PostgreSQL",
      "Microservices Architecture",
      "Headless Commerce",
      "Cloud Computing",
      "AWS",
    ],
    award: [
      "Adobe Certified Expert: Digital Experience Front-End Developer",
      "World Traveler Award (Meet Magento NY)",
      "B2B Champ Award (Meet Magento India)",
      "Adobe Experience Maker Award",
    ],
  };

  const themeInitScript = `
    (function () {
      try {
        var stored = localStorage.getItem('nv-theme');
        var theme = stored === 'light' || stored === 'dark'
          ? stored
          : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (theme === 'dark') document.documentElement.classList.add('dark');
      } catch (e) {}
    })();
  `;

  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta
          name="title"
          content="Sai Navaneeth V | Solution Architect & AI Full-Stack Engineer"
        />
        <meta
          name="description"
          content="Solution Architect with 8+ YoE designing headless (MACH) architectures and Applied AI systems. Experience leading engineering for global brands including Bayer and Danube Homes."
        />
        <meta
          name="keywords"
          content="Solution Architect Bengaluru, Staff Full Stack Engineer, AI Engineer Bengaluru, Next.js Architect, Headless Commerce Specialist, Composable Architecture, Supabase, Hono, AWS, Sai Navaneeth V"
        />
        <link rel="canonical" href="https://www.navaneethvijay.in/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.navaneethvijay.in/" />
        <meta
          property="og:title"
          content="Sai Navaneeth V | Solution Architect & AI Full-Stack Engineer"
        />
        <meta
          property="og:description"
          content="Delivering high-impact technical systems: +40% checkout conversions and -30% page-load speeds for global enterprises. Explore active Applied AI labs."
        />
        <meta
          property="og:image"
          content="https://www.navaneethvijay.in/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.navaneethvijay.in/" />
        <meta
          property="twitter:title"
          content="Sai Navaneeth V | Solution Architect & AI Full-Stack Engineer"
        />
        <meta
          property="twitter:description"
          content="Solution Architect specializing in high-performance web platforms, headless storefronts, and production-ready Applied AI agentic systems."
        />
        <meta
          property="twitter:image"
          content="https://www.navaneethvijay.in/og-image.png"
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
