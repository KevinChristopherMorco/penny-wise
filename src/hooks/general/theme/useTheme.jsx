import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setCurrentTheme] = useState(
    JSON.parse(localStorage.getItem("currentTheme")) || {
      currentTheme: "light",
    }
  );
  const { currentTheme } = theme;
  const setTheme = (selectedTheme) => {
    setCurrentTheme(() => ({ currentTheme: selectedTheme }));
    document.body.classList = "";
    document.body.classList.add(selectedTheme);
  };

  useEffect(() => {
    localStorage.setItem("currentTheme", JSON.stringify(theme));
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;
export { useThemeContext };
