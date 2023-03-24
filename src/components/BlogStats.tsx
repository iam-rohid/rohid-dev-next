import { TWITTER_HANDLE } from "@/data/constants";
import { BlogStat, ReactionKeys } from "@/types/stat";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";

const REACTION_ITEMS: {
  type: ReactionKeys;
  emoji: string;
  title: string;
}[] = [
  {
    type: "like",
    emoji: "👍",
    title: "Like",
  },
  {
    type: "celebrate",
    emoji: "👏",
    title: "Celebrate",
  },
  {
    type: "support",
    emoji: "🫴",
    title: "Support",
  },
  {
    type: "love",
    emoji: "❤️",
    title: "Love",
  },
  {
    type: "insightful",
    emoji: "💡",
    title: "Insightful",
  },
  {
    type: "funny",
    emoji: "😂",
    title: "Funny",
  },
];

const BlogStats = ({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<BlogStat>({});
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [stick, setStick] = useState(false);

  const fetchCount = useCallback(async () => {
    const res = await fetch(`/api/stats/${slug}`);
    const data = (await res.json()) as BlogStat;
    setStats(data);
    setIsLoading(false);
  }, [slug]);

  const handleCopyLinkToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(location.href);
    setStats((stats) => ({
      ...stats,
      shares: (stats.shares || 0) + 1,
    }));
    await fetch(`/api/shares/${slug}`, {
      method: "POST",
      body: JSON.stringify({
        type: "clipboard",
      }),
    });
  }, [slug]);

  const handleShareViaTwitter = useCallback(async () => {
    setStats((stats) => ({
      ...stats,
      shares: (stats.shares || 0) + 1,
    }));
    await fetch(`/api/shares/${slug}`, {
      method: "POST",
      body: JSON.stringify({
        type: "twitter",
      }),
    });
  }, [slug]);

  const tweetUrl = useMemo(() => {
    const url = new URL(`https://twitter.com/intent/tweet`);
    url.searchParams.set("text", `${title}\n\nby @${TWITTER_HANDLE}`);
    url.searchParams.set("url", location.href);
    return url.href;
  }, [title]);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) {
      return;
    }
    const onScroll = () => {
      if (
        window.scrollY + window.innerHeight <
        element.offsetTop + element.clientHeight
      ) {
        setStick(true);
      } else {
        setStick(false);
      }
    };
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const renderShareButton = useCallback(
    () => (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="group flex items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full group-hover:bg-gray-900/10 dark:group-hover:bg-gray-50/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="px-2 font-medium">
              {(stats.shares || 0).toLocaleString()}
            </span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="center"
            className="rounded-xl border border-gray-900/10 bg-white/70 p-2 shadow-xl backdrop-blur-xl dark:border-gray-50/10 dark:bg-gray-900/70"
          >
            <DropdownMenu.Item asChild>
              <button
                className="flex h-10 w-full items-center gap-4 rounded-lg px-4 outline-none focus:bg-gray-900/10 dark:focus:bg-gray-50/10"
                onClick={handleCopyLinkToClipboard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Copy Link</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <a
                className="flex h-10 w-full items-center gap-4 rounded-lg px-4 outline-none focus:bg-gray-900/10 dark:focus:bg-gray-50/10"
                href={tweetUrl}
                onClick={handleShareViaTwitter}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
                <span>Twitter</span>
              </a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    ),
    [handleCopyLinkToClipboard, handleShareViaTwitter, stats.shares, tweetUrl]
  );

  const renderLikeButton = useCallback(
    () => (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="group flex items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full group-hover:bg-gray-900/10 dark:group-hover:bg-gray-50/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <span className="px-2 font-medium">
              {(stats.reactions || 0).toLocaleString()}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="center"
            className="flex items-center rounded-2xl border border-gray-900/10 bg-white/70 p-2 shadow-xl backdrop-blur-xl dark:border-gray-50/10 dark:bg-gray-900/70"
          >
            {REACTION_ITEMS.map((item) => (
              <button
                title={item.title}
                key={item.type}
                className="group flex flex-col items-center outline-none"
              >
                <span className="p-2 text-4xl transition-transform group-hover:scale-150">
                  {item.emoji}
                </span>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {(!!stats.reactionsDetails &&
                    stats.reactionsDetails[item.type]) ||
                    0}
                </span>
              </button>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    ),
    [stats.reactions, stats.reactionsDetails]
  );

  return (
    <div ref={cardRef} className="flex h-28 w-full">
      <div className={clsx("w-full", stick ? "fixed bottom-8" : "mb-8")}>
        <div className="container mx-auto flex h-full px-4 lg:gap-8 lg:px-8 xl:max-w-screen-xl">
          <div className="flex flex-1 items-center justify-center">
            <div
              className={clsx(
                "flex h-20 items-center gap-4 rounded-2xl border border-gray-900/10 bg-white/70 px-4 backdrop-blur-xl transition-shadow dark:border-gray-50/10 dark:bg-gray-900/70",
                {
                  "shadow-xl": stick,
                }
              )}
            >
              {renderLikeButton()}
              {renderShareButton()}
              <button className="group flex items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full group-hover:bg-gray-900/10 dark:group-hover:bg-gray-50/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                  </svg>
                </div>
                <span className="px-2 font-medium">
                  {(stats.views || 0).toLocaleString()}
                </span>
              </button>
            </div>
          </div>
          <div className="w-72 max-lg:hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogStats;
