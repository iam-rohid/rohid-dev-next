import { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "@/utils/constants";

export default function Document() {
  return (
    <Html lang="en" className="scroll-pt-20 scroll-smooth">
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </Head>
      <body className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
