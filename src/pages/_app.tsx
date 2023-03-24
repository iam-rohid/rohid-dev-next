import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { GA_TRACKING_ID } from "@/utils/constants";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const themeMode = localStorage.getItem("theme-mode");
    if (themeMode == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      gtag("config", GA_TRACKING_ID!, {
        page_path: window.location.pathname,
      });
    };

    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;
