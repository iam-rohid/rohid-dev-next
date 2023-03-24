/* eslint-disable @next/next/no-img-element */
import BlogCard from "@/components/BlogCard";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { TWITTER_HANDLE } from "@/data/constants";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { useMemo } from "react";

const Home = () => {
  const recentPosts = useMemo(
    () =>
      allPosts
        .sort((a, b) => {
          return compareDesc(new Date(a.publishDate), new Date(b.publishDate));
        })
        .slice(0, 4),
    []
  );

  return (
    <main className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl">
      <section className="py-16 flex items-center gap-20 max-lg:flex-col-reverse lg:my-24 lg:justify-between lg:gap-32">
        <div className="max-w-2xl flex-1 max-lg:text-center">
          <p className="mb-2 text-xl font-semibold text-gray-600 dark:text-gray-400 md:text-2xl">
            Hi, 👋
          </p>
          <h1 className="text-5xl font-bold md:text-7xl">
            I&apos;m <span className="underline">Rohid</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 md:text-lg">
            a{" "}
            <b className="font-semibold text-gray-800 dark:text-gray-100">
              self-thought
            </b>
            <b className="font-semibold text-gray-800 dark:text-gray-100">
              full-stack
            </b>{" "}
            developer who likes to build modern and useful stuff on the internet
          </p>
          <div className="mt-6 flex items-center gap-8 max-lg:justify-center md:mt-8">
            <a
              href="/contact"
              rel="prefetch"
              className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white shadow-xl shadow-primary-500/20 transition-all hover:bg-primary-600 hover:shadow-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
            <img
              src="https://pbs.twimg.com/profile_images/1636007025829359616/a-jQHIUc_400x400.jpg"
              alt="Rohid's profile"
              className="absolute inset-0 rounded-full object-cover"
            />

            <a
              href={`https://twitter.com/${TWITTER_HANDLE}`}
              target="_blank"
              className="absolute top-full left-1/2 flex -translate-x-1/2 flex-col items-center"
            >
              <div className="-mb-1.5 mt-1 h-3 w-3 rotate-45 border-t border-l border-gray-900/10 bg-white dark:border-gray-50/10 dark:bg-gray-900" />
              <div className="flex items-center gap-2 rounded-lg border border-gray-900/10 bg-white px-2.5 py-2 uppercase shadow-lg dark:border-gray-50/10 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
                <TwitterIcon className="text-xl fill-gray-600 dark:fill-gray-300" />
                <span className="whitespace-nowrap text-sm">54 Followers</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold">Recent Posts</h2>
          <a
            href="/blog"
            rel="prefetch"
            className="text-primary-500 dark:text-primary-400 px-4 py-2 rounded-lg font-medium hover:bg-primary-500/5 hover:underline inline-flex items-center gap-2"
          >
            See All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 -mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </a>
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

export default Home;
