import { INSTAGRAM_HANDLE, MAIN_NEMU, TWITTER_HANDLE } from "@/data/constants";
import { trackLinkClick } from "@/utils/tracking";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import HeaderVerticalSeparator from "./HeaderVerticalSeparator";
import InstagramIcon from "./icons/InstagramIcon";
import TwitterIcon from "./icons/TwitterIcon";
import ThemeToggle from "./ThemeToggle";

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
            onClick={() => trackLinkClick("Header Twitter")}
            href={`https://twitter.com/${TWITTER_HANDLE}`}
            target="_blank"
            rel="nofollow"
            className="fill-gray-700 font-medium hover:fill-gray-500 dark:fill-gray-200 dark:hover:fill-gray-400 p-2 text-2xl"
            title="Go to Twitter"
          >
            <TwitterIcon />
          </Link>

          <Link
            onClick={() => trackLinkClick("Header Instagram")}
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="nofollow"
            className="fill-gray-700 font-medium hover:fill-gray-500 dark:fill-gray-200 dark:hover:fill-gray-400 p-2 text-2xl"
            title="Go to Instagram"
          >
            <InstagramIcon />
          </Link>

          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
