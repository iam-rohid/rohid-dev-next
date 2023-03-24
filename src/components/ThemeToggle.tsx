import { useCallback, useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const ThemeToggle = () => {
  const handleToggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme-mode", isDark ? "light" : "dark");
    document.documentElement.classList.toggle("dark", !isDark);
  }, []);

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 font-medium text-gray-700 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 text-2xl"
      title="Toggle Theme"
    >
      <MoonIcon className="dark:block hidden" />
      <SunIcon className="dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
