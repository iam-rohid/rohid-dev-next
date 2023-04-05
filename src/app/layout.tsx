import { ReactNode } from "react";
import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import Header from "./Header";
import {
  ANALYTICS_URL,
  DEFAULT_METADATA,
  INIT_GTAG_CODE,
  INIT_THEME_CODE,
} from "@/utils/constants";
import Footer from "./Footer";

export const metadata = DEFAULT_METADATA;

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className="scroll-pt-20 scroll-smooth">
      <head>
        <script async src={ANALYTICS_URL} />
        <script dangerouslySetInnerHTML={{ __html: INIT_GTAG_CODE }} />
        <script dangerouslySetInnerHTML={{ __html: INIT_THEME_CODE }} />
      </head>
      <body className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
