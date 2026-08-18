import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/contentful";
import Head from "next/head";
import SectionHeadings from "@/components/project/SectionHeadings";

export default function BlogIndex({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-0">
      <Head>
        <title>Blog | Navaneeth Vijay</title>
        <meta
          name="description"
          content="Read about web development, design, and technology insights from Navaneeth Vijay"
        />
        <link rel="canonical" href="https://www.navaneethvijay.in/blog" />
      </Head>

      <section className="mt-20 pt-10">
        <SectionHeadings
          title="The Family Chronicles"
          seoTitle="Blog"
          description="Stories from the trenches of web development"
        />
      </section>
      <div className="py-10">
        <div>
          {posts.map((post) => (
            <Link
              key={post.path}
              href={`/blog/${post.path}`}
              className="flex flex-col space-y-1 mb-4"
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
                  {new Date(post.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
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
