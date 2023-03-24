import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useEffect } from "react";
import Footer from "@/components/Footer";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const themeMode = localStorage.getItem("theme-mode");
    if (themeMode == "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;
