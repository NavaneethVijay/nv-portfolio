import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/project/Header";
import Head from "next/head";
import Footer from "@/components/project/Footer";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";

const GA_TRACKING_ID = "G-RVL8C302NE";

const handleRouteChange = (url: string) => {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <div className="font-body bg-paper text-ink">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>
            Sai Navaneeth V | Solution Architect &amp; AI Full-Stack Engineer
          </title>
        </Head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RVL8C302NE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Header />
        <Component {...pageProps} />
        <section className="pt-10">
          <Footer />
        </section>
      </div>
    </ThemeProvider>
  );
}
