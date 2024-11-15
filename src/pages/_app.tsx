import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Cinzel_Decorative, Norican, Libre_Franklin } from "next/font/google";
import Header from "@/components/project/Header";
import Head from "next/head";
import ContactMe from "@/components/project/contactMe";
import Footer from "@/components/project/Footer";
import SectionHeadings from "@/components/project/SectionHeadings";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${font.variable} ${cinzel.variable} ${norican.variable} ${libreFranklin.variable}`}
    >
      <Head>
        <title>
          Navaneeth Vijay | Full Stack Web Developer | UI/UX Design, Responsive
          Websites
        </title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <section className="pt-10">
        <Footer />
      </section>
    </div>
  );
}
