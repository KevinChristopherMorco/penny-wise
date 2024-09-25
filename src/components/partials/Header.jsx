import React from "react";

import { IconMoonStars, IconBrightness2 } from "@tabler/icons-react";
import { useThemeContext } from "../../hooks/general/theme/useTheme";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentTheme, setTheme } = useThemeContext();

  const settings =
    JSON.parse(localStorage.getItem("username")) ||
    localStorage.setItem("username", JSON.stringify({ username: "stranger" }));

  const { username } = settings;
  return (
    <nav className="p-4 flex justify-between items-center text-[var(--primary-color)] bg-[var(--accent-color)] border-b dark:bg-[var(--dark-primary-color)] dark:border-[var(--dark-accent-color)]">
      <div>
        <p className="flex items-center gap-2 text-lg font-bold">
          Hello
          {username === "stranger" && (
            <Link
              to="/settings"
              className="text-[.7rem] text-[var(--primary-color)] cursor-pointer dark:text-[var(--dark-accent-color)]"
            >
              [Set your username here]
            </Link>
          )}
        </p>
        <p className="text-[.75rem] font-light">
          Track your spending with penny wise!
        </p>
      </div>
      {currentTheme === "light" ? (
        <div
          className="animate-fadeIn dark:text-[var(--dark-accent-color)]"
          onClick={() => setTheme("dark")}
        >
          <IconMoonStars />
        </div>
      ) : (
        <div
          className="animate-fadeIn dark:text-[var(--dark-accent-color)]"
          onClick={() => setTheme("light")}
        >
          <IconBrightness2 />
        </div>
      )}
    </nav>
  );
};

export default Header;
