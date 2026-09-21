import { GetServerSideProps } from "next";
import { getAllPosts } from "@/lib/contentful";
import { projects } from "@/data/projects";

const SITE_URL = "https://www.navaneethvijay.in";

function generateSitemap(posts: any[]) {
  const staticRoutes = [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "projects", changefreq: "monthly", priority: "0.9" },
    { path: "experience", changefreq: "monthly", priority: "0.8" },
    { path: "blog", changefreq: "weekly", priority: "0.8" },
  ];

  const staticUrls = staticRoutes
    .map(
      ({ path, changefreq, priority }) => `
  <url>
    <loc>${SITE_URL}/${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("");

  const projectUrls = projects
    .filter((project) => project.slug)
    .map(
      (project) => `
  <url>
    <loc>${SITE_URL}/projects/${project.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>${project.caseStudy ? "0.85" : "0.7"}</priority>
  </url>`
    )
    .join("");

  const postUrls = posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.path}</loc>
    <lastmod>${new Date(post.publishedDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${projectUrls}${postUrls}
</urlset>`;
}

export default function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPosts(false);
  const sitemap = generateSitemap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
