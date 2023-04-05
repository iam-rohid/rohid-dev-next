import BlogCard from "@/components/BlogCard";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const recentPosts = allPosts
    .sort((a, b) => {
      return compareDesc(new Date(a.publishDate), new Date(b.publishDate));
    })
    .slice(0, 4);

  return (
    <main className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl">
      <Head>
        <title>Rohid</title>
        <meta
          name="description"
          content="A self-thought full-stack developer who likes build modern and beautiful stuffs on the internet"
        />
      </Head>
      <section className="py-16 flex items-center gap-20 max-lg:flex-col-reverse lg:my-24 lg:justify-between lg:gap-32">
        <div className="max-w-2xl flex-1 max-lg:text-center">
          <div className="prose-xl prose dark:prose-invert">
            <h3>Hi, 👋</h3>
            <h1>
              I&apos;m <span className="underline">Rohid</span>
            </h1>
            <p>
              a <b>self-thought</b> <b>full-stack</b> developer who likes build
              modern and beautiful stuffs on the internet
            </p>
          </div>
          <div className="mt-6 flex items-center gap-8 max-lg:justify-center md:mt-8">
            <Link
              href="/contact"
              className="rounded-xl text-lg bg-primary-500 hover:bg-primary-600 px-6 py-3 font-medium text-white transition-all hover:shadow-sm duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-48 md:h-64 lg:h-80 aspect-square">
            <Image
              src="/images/avatar.JPG"
              alt="Rohid's profile"
              width={768}
              height={768}
              className="absolute w-full h-full rounded-full object-cover"
            />

            {/* <Link
              onClick={() => trackLinkClick("Twitter Follower Counter")}
              href={`https://twitter.com/${TWITTER_HANDLE}`}
              target="_blank"
              className="absolute top-full left-1/2 flex -translate-x-1/2 flex-col items-center"
            >
              <div className="-mb-1.5 mt-1 h-3 w-3 rotate-45 border-t border-l border-gray-900/10 bg-white dark:border-gray-50/10 dark:bg-gray-900" />
              <div className="flex items-center gap-2 rounded-lg border border-gray-900/10 bg-white px-2.5 py-2 uppercase shadow-lg dark:border-gray-50/10 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
                <TwitterIcon className="text-xl fill-gray-600 dark:fill-gray-300" />
                <span className="whitespace-nowrap text-sm">
                  220~ Followers
                </span>
              </div>
            </Link> */}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-primary-500 dark:text-primary-400 px-4 py-2 rounded-lg font-medium hover:bg-primary-500/5 hover:underline inline-flex items-center gap-2"
          >
            See All
            <ArrowRightIcon className="-ml-2 text-2xl" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {recentPosts.map((post) => (
            <BlogCard post={post} key={post._id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
