import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

const TableOfContent = ({
  headings,
  slug,
}: {
  headings: any[];
  slug: string;
}) => {
  const [visibaleItems, setVisibaleItems] = useState<string[]>([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element) {
          if (
            element.offsetTop > window.scrollY &&
            element.offsetTop < window.scrollY + window.innerHeight
          ) {
            setVisibaleItems((items) =>
              !items.includes(heading.slug) ? [...items, heading.slug] : items
            );
          } else {
            setVisibaleItems((items) =>
              items.filter((id) => id !== heading.slug)
            );
          }
        }
      });
    };

    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  return (
    <aside className="sticky top-24 h-fit w-72 rounded-xl border border-gray-900/10 dark:border-gray-50/10 max-lg:hidden">
      <header className="flex h-12 items-center border-b border-gray-900/10 px-4 dark:border-gray-50/10">
        <p className="flex-1">Table of Contents</p>
        {showScrollToTop && (
          <button
            className="-mx-2 rounded-md bg-slate-100 px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Scroll to Top
          </button>
        )}
      </header>
      <ul className="py-2">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <Link
              href={`/blog/${slug}#${heading.slug}`}
              className={clsx(
                "flex h-10 items-center truncate px-4 hover:underline",
                visibaleItems.includes(heading.slug)
                  ? "bg-primary-500/10 text-primary-500 dark:text-primary-400"
                  : "text-gray-600 hover:bg-gray-900/10 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-50/10 dark:hover:text-gray-50"
              )}
              style={{
                paddingLeft: `${heading.depth - 1}rem`,
              }}
            >
              <p className="flex-1 truncate">{heading.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TableOfContent;
