import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Navaneeth Vijay",
    jobTitle: "Solution Architect | Senior Fullstack Engineer",
    url: "https://www.navaneethvijay.in/",
    sameAs: [
      "https://www.linkedin.com/in/sai-navaneeth-v/",
      "https://github.com/NavaneethVijay",
    ],
  };

  return (
    <Html lang="en" className="dark">
      <Head>
        <meta
          name="description"
          content="Navaneeth Vijay is a Solution Architect and Senior Fullstack Engineer in Bengaluru with 8+ years building AI-driven platforms, enterprise e-commerce systems, and high-performance web apps."
        />
        <meta
          name="keywords"
          content="Solution Architect, Senior Fullstack Engineer, AI Engineering, RAG, TypeScript, Next.js, Enterprise E-commerce, Bengaluru"
        />
        <link rel="canonical" href="https://www.navaneethvijay.in/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Navaneeth Vijay | Solution Architect & Senior Fullstack Engineer"
        />
        <meta
          property="og:description"
          content="8+ years building AI-driven platforms, enterprise e-commerce systems, and high-performance web apps."
        />
        <meta
          property="og:image"
          content="https://www.navaneethvijay.in/favicon.png"
        />
        <meta property="og:url" content="https://www.navaneethvijay.in/" />

        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Navaneeth Vijay | Solution Architect & Senior Fullstack Engineer"
        />
        <meta
          name="twitter:description"
          content="8+ years building AI-driven platforms, enterprise e-commerce systems, and high-performance web apps."
        />
        <meta
          name="twitter:image"
          content="https://www.navaneethvijay.in/favicon.png"
        />
        <meta name="twitter:url" content="https://www.navaneethvijay.in/" />

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
