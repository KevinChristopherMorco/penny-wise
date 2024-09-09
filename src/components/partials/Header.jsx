import React from "react";

import { IconMoonStars, IconBrightness2 } from "@tabler/icons-react";

const Header = ({ currentTheme, setTheme }) => {
  // const { currentTheme, setTheme } = useTheme();
  return (
    <nav className="flex justify-between items-center">
      <div>
        <p className="text-xl font-bold">Hello, Kevin!</p>
        <p className="text-[.75rem] font-light">
          Here you can view the overview of your budget.
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
