"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MAIN_NEMU } from "@/data/constants";
import HeaderVerticalSeparator from "./HeaderVerticalSeparator";
import Link from "next/link";
import HamburgerIcon from "@/components/icons/HamburgerIcon";

const HamburgerMenu = () => {
  return (
    <>
      <HeaderVerticalSeparator className="md:hidden" />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="items-center justify-center p-2 font-medium text-gray-700 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 md:hidden text-2xl">
          <HamburgerIcon />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          align="end"
          side="bottom"
          className="w-screen max-w-[220px] rounded-lg border border-gray-900/10 bg-white py-2 shadow-xl dark:border-gray-50/10 dark:bg-gray-800"
        >
          {MAIN_NEMU.map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                href={item.href}
                className="flex h-10 items-center px-4 text-gray-600 outline-none focus:bg-gray-900/10 focus:text-gray-700 dark:text-gray-400 dark:focus:bg-gray-50/10 dark:focus:text-gray-200"
              >
                {item.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default HamburgerMenu;
