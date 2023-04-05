import { BASE_DOMAIN } from "@/utils/constants";

export async function GET() {
  const data = `User-agent: *
  Allow: /
  
  Sitemap: ${BASE_DOMAIN}/sitemap.xml`;

  return new Response(data);
}
