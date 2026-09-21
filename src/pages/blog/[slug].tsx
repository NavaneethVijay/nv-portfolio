import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts, getBlogPost } from "@/lib/contentful";
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

export default function BlogPostPage({ post }: any) {
  if (!post) return null;

  const description = toMetaDescription(post.content.json);
  const url = `https://www.navaneethvijay.in/blog/${post.path}`;

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
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
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
              {parsedContent(post.content.json)}
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
  return {
    props: {
      post: postItem,
    },
    revalidate: 60,
  };
};
