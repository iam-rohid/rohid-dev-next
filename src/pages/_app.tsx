import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useEffect } from "react";

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
    </>
  );
};

export default App;
