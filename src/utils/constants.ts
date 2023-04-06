import { Metadata } from "next";

export const GA_TRACKING_ID = "G-N165NS4LRX";

export const BASE_DOMAIN = "https://rohid.dev";

export const ANALYTICS_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

export const INIT_GTAG_CODE = `
window.dataLayer = window.dataLayer || [];
function gtag() {dataLayer.push(arguments);}
gtag('js', new Date());
`;

export const INIT_THEME_CODE = `
const themeMode = localStorage.getItem("theme-mode");
if (themeMode == "dark") {
  document.documentElement.classList.add("dark");
}
`;

export const DEFAULT_TITLE = "Rohid";
export const DEFAULT_DESCRIPTION =
  "A self-thought full-stack developer who likes build modern and beautiful stuffs on the internet";
export const DEFAULT_KEYWORDS = [
  "rohid",
  "rohidul islam",
  "rohidul",
  "react",
  "developer",
  "dev",
  "portfolio",
  "best portfolio",
  "blog",
  "tech blog",
];

export const DEFAULT_METADATA: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
};
