import { BASE_DOMAIN } from "@/utils/constants";
import { allPages, allPosts } from "contentlayer/generated";

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url> 
        <loc>${BASE_DOMAIN}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
        <loc>${BASE_DOMAIN}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>${BASE_DOMAIN}/works</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
        <loc>${BASE_DOMAIN}/snippets</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <!-- All Dynamic Pages -->
     ${allPages
       .map(({ slug }) => {
         return `<url>
           <loc>${`${BASE_DOMAIN}/${slug}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
       </url>`;
       })
       .join("\n")}
    <!-- All Posts -->
     ${allPosts
       .map(({ slug }) => {
         return `<url>
           <loc>${`${BASE_DOMAIN}/blog/${slug}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
       </url>`;
       })
       .join("\n")}
   </urlset>
 `;
}

export async function GET() {
  const sitemap = generateSiteMap();
  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
