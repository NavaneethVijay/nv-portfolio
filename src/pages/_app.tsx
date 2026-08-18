import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Cinzel_Decorative, Norican, Libre_Franklin } from "next/font/google";
import Header from "@/components/project/Header";
import Head from "next/head";
import Footer from "@/components/project/Footer";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

const font = localFont({
  src: "./fonts/Corleone.otf",
  weight: "400",
  style: "normal",
  variable: "--font-godfather",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal"],
  variable: "--font-cinzel",
});

const norican = Norican({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-norican",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-libre-franklin",
});

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
    <div
      className={`${font.variable} ${cinzel.variable} ${norican.variable} ${libreFranklin.variable}`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          Navaneeth Vijay | Solution Architect & Senior Fullstack Engineer
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
  );
}
