import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const Themes = {
  LIGHT: "light",
  DARK: "dark",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(Themes.DARK);
  function toggleTheme() {
    setTheme((currTheme) =>
      currTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT
    );
  }
  return (
    <ThemeContext.Provider value={{ Themes, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("ThemeContext was used outside of ThemeProvider scope");
  }
  return context;
}
