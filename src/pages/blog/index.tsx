import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/contentful";
import Head from "next/head";
import SectionHeadings from "@/components/project/SectionHeadings";

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
      <div className="py-6 border-t border-border">
        {posts.map((post) => (
          <Link
            key={post.path}
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
        ))}
      </div>
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
