import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { useMemo } from "react";

const Footer = () => {
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
    <footer>
      <div className="container mx-auto px-4 lg:px-8 xl:max-w-screen-xl">
        <div className="grid grid-cols-2 gap-4 py-16 lg:grid-cols-4 lg:gap-8">
          <div className="col-span-2">
            <div className="max-w-lg">
              <h3 className="mb-4 font-medium text-gray-600 dark:text-gray-400">
                About Me
              </h3>
              <p>
                a <b>self-thought</b> <b>full-stack</b> developer who likes
                build modern and beautiful stuffs on the internet
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-medium text-gray-600 dark:text-gray-400">
              Recent Articles
            </h3>
            <ul className="space-y-2">
              {recentPosts.map((post) => (
                <li key={post._id}>
                  <a
                    rel="prefetch"
                    className="hover:text-gray-500 dark:hover:text-gray-400"
                    href={`blog/${post.slug}`}
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-medium text-gray-600 dark:text-gray-400">
              Contact Me
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="hover:text-gray-500 dark:hover:text-gray-400"
                  href="/contact"
                  rel="prefetch"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-500 dark:hover:text-gray-400"
                  href="https://twitter.com/rohiddev"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-500 dark:hover:text-gray-400"
                  href="https://instagram.com/rohiddev"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-900/10 py-4 dark:border-gray-50/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2023, Rohid
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
