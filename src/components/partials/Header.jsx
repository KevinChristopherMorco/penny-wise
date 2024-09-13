import React from "react";

import { IconMoonStars, IconBrightness2 } from "@tabler/icons-react";

const Header = ({ currentTheme, setTheme }) => {
  return (
    <nav className="p-4 flex justify-between items-center text-[var(--text-accent)] bg-[var(--accent-color)]">
      <div>
        <p className="text-lg font-bold">Hello, Kevin!</p>
        <p className="text-[.75rem] font-light">
          Track your spending with penny wise!
        </p>
      </div>
      {currentTheme === "light" && (
        <div
          className="text-violet-800"
          onClick={() => setTheme({ currentTheme: "dark" })}
        >
          <IconMoonStars />
        </div>
      )}

      {currentTheme === "dark" && (
        <div
          className="text-yellow-400"
          onClick={() => setTheme({ currentTheme: "light" })}
        >
          <IconBrightness2 />
        </div>
      )}
    </nav>
  );
};

export default Header;
