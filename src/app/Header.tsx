import { INSTAGRAM_HANDLE, MAIN_NEMU, TWITTER_HANDLE } from "@/data/constants";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import ThemeToggle from "./ThemeToggle";
import InstagramIcon from "@/components/icons/InstagramIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import clsx from "clsx";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-900/10 bg-white/70 backdrop-blur-xl dark:border-gray-50/10 dark:bg-gray-900/70">
      <div className="flex h-14 items-center gap-8 px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400"
        >
          Rohid
        </Link>

        <nav className="flex items-center gap-6 max-md:hidden">
          {MAIN_NEMU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-gray-800 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />

          <HeaderVerticalSeparator />

          <Link
            href={`https://twitter.com/${TWITTER_HANDLE}`}
            target="_blank"
            rel="nofollow"
            className="fill-gray-700 font-medium hover:fill-gray-500 dark:fill-gray-200 dark:hover:fill-gray-400 p-2 text-2xl"
            title="Go to Twitter"
          >
            <TwitterIcon />
          </Link>

          <Link
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="nofollow"
            className="fill-gray-700 font-medium hover:fill-gray-500 dark:fill-gray-200 dark:hover:fill-gray-400 p-2 text-2xl"
            title="Go to Instagram"
          >
            <InstagramIcon />
          </Link>

          <HeaderVerticalSeparator className="md:hidden" />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

const HeaderVerticalSeparator = ({
  className: className,
}: {
  className?: string;
}) => (
  <div
    className={clsx("h-5 w-px bg-gray-900/10 dark:bg-gray-100/10", className)}
  />
);
