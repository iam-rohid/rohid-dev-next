import { allPages, allPosts } from "contentlayer/generated";
import { GetServerSideProps } from "next";

const DOMAIN = "https://rohid.dev";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url> 
        <loc>${DOMAIN}</loc>
    </url>
    <url>
        <loc>${DOMAIN}/blog</loc>
    </url>
    <url>
      <loc>${DOMAIN}/works</loc>
    </url>
    <url>
        <loc>${DOMAIN}/snippets</loc>
    </url>
    <!--All Dynamic Pages-->
     ${allPages
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${DOMAIN}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
    <!--All Posts-->
     ${allPosts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${DOMAIN}/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
