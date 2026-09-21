import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts, getBlogPost, fetchAssest } from "@/lib/contentful";
import parsedContent from "@/components/parsedContent";
import { IconArrowBack } from "@tabler/icons-react";
import { fadeUpItem } from "@/lib/motion";

function extractPlainText(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.content)) {
    return node.content.map(extractPlainText).join(" ");
  }
  return "";
}

function toMetaDescription(json: any): string {
  const text = extractPlainText(json).replace(/\s+/g, " ").trim();
  return text.length > 155 ? `${text.slice(0, 155).trim()}…` : text;
}

function collectEmbeddedAssetIds(node: any, ids: Set<string> = new Set()): Set<string> {
  if (!node || typeof node !== "object") return ids;
  if (node.nodeType === "embedded-asset-block") {
    const id = node.data?.target?.sys?.id;
    if (id) ids.add(id);
  }
  if (Array.isArray(node.content)) {
    node.content.forEach((child: any) => collectEmbeddedAssetIds(child, ids));
  }
  return ids;
}

export default function BlogPostPage({ post, assets }: any) {
  if (!post) return null;

  const description = toMetaDescription(post.content.json);
  const url = `https://www.navaneethvijay.in/blog/${post.path}`;
  const ogImage = "https://www.navaneethvijay.in/og-image.png";
  const publishedIso = new Date(post.publishedDate).toISOString();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    url,
    image: ogImage,
    datePublished: publishedIso,
    dateModified: publishedIso,
    author: {
      "@type": "Person",
      name: "Sai Navaneeth V",
      alternateName: "Navaneeth Vijay",
      url: "https://www.navaneethvijay.in/",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <Head>
        <title>{post.title} | Sai Navaneeth V</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>

      <div className="mt-20">
        <article className="container mx-auto md:py-10 px-6 md:px-4">
          <div className="mb-8">
            <Link className="mono-label text-ink-mute flex items-center gap-1 text-xs hover:text-brand-text transition-colors" href="/blog">
              <IconArrowBack className="h-4 w-4" /> Back to Blog
            </Link>
          </div>
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUpItem}
              className="text-2xl md:text-5xl font-semibold mb-4 font-display tracking-tight text-ink"
            >
              {post.title}
            </motion.h1>
            <div className="mono-label text-xs text-ink-mute flex gap-1.5 items-center border-b border-border pb-6">
              <span>Navaneeth Vijay</span>
              <span aria-hidden="true">&middot;</span>
              <time>
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="max-w-none font-body text-ink-soft mt-8">
              {parsedContent(post.content.json, assets)}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.path },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getBlogPost(slug);

  if (post && !post.length) {
    return {
      notFound: true,
    };
  }

  const postItem = post[0];

  const assetIds = Array.from(collectEmbeddedAssetIds(postItem.content.json));
  const assetEntries = await Promise.all(
    assetIds.map(async (id) => {
      const { asset } = await fetchAssest(id);
      return [id, asset] as const;
    })
  );

  return {
    props: {
      post: postItem,
      assets: Object.fromEntries(assetEntries),
    },
    revalidate: 60,
  };
};
