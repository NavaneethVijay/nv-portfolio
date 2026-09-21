import { GetStaticProps } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts } from "@/lib/contentful";
import Head from "next/head";
import SectionHeadings from "@/components/project/SectionHeadings";
import { fadeUpContainer, fadeUpItem } from "@/lib/motion";

export default function BlogIndex({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-0">
      <Head>
        <title>Blog | Sai Navaneeth V</title>
        <meta
          name="description"
          content="Read about web development, AI engineering, and technology insights from Navaneeth Vijay"
        />
        <link rel="canonical" href="https://www.navaneethvijay.in/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | Sai Navaneeth V" />
        <meta
          property="og:description"
          content="Read about web development, AI engineering, and technology insights from Navaneeth Vijay"
        />
        <meta property="og:url" content="https://www.navaneethvijay.in/blog" />
        <meta property="og:image" content="https://www.navaneethvijay.in/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Sai Navaneeth V" />
        <meta
          name="twitter:description"
          content="Read about web development, AI engineering, and technology insights from Navaneeth Vijay"
        />
        <meta name="twitter:image" content="https://www.navaneethvijay.in/og-image.png" />
      </Head>

      <section className="pt-6 md:mt-20 md:pt-10">
        <SectionHeadings
          index="01"
          title="From the blog"
          emphasize="blog"
          seoTitle="Blog"
          description="Notes on shipping software, mostly."
        />
      </section>
      <motion.div
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="py-6 border-t border-border"
      >
        {posts.map((post) => (
          <motion.div key={post.path} variants={fadeUpItem}>
            <Link
              href={`/blog/${post.path}`}
              className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 py-4 border-b border-border group"
            >
              <span className="mono-label text-xs text-ink-mute w-[9rem] shrink-0">
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-ink font-body group-hover:text-brand-text transition-colors">
                {post.title}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(false);
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
