import React from "react";

import { IconMoonStars, IconBrightness2 } from "@tabler/icons-react";
import { useThemeContext } from "../../hooks/general/theme/useTheme";

const Header = () => {
  const { currentTheme, setTheme } = useThemeContext();
  return (
    <nav className="p-4 flex justify-between items-center text-[var(--text-accent)] bg-[var(--accent-color)] border-b dark:bg-[var(--dark-primary-color)] dark:border-[var(--dark-accent-color)]">
      <div>
        <p className="text-lg font-bold">Hello, Kevin!</p>
        <p className="text-[.75rem] font-light">
          Track your spending with penny wise!
        </p>
      </div>
      {currentTheme === "light" ? (
        <div
          className="text-violet-800 animate-fadeIn dark:text-[var(--dark-accent-color)]"
          onClick={() => setTheme("dark")}
        >
          <IconMoonStars />
        </div>
      ) : (
        <div
          className="text-violet-800 animate-fadeIn dark:text-[var(--dark-accent-color)]"
          onClick={() => setTheme("light")}
        >
          <IconBrightness2 />
        </div>
      )}
    </nav>
  );
};

export default Header;
