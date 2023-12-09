import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/theme";

function Header() {
  const { Themes, theme, toggleTheme } = useTheme();
  return (
    <div className=" flex items-center justify-between h-12 fixed top-0 left-72 right-6 dark:bg-slate-600 opacity-90">
      <span className="dark:text-slate-100  font-bold text-lg">ChatGPT</span>
      <div>
        <button
          className="p-1 rounded-full dark:hover:bg-slate-500 hover:bg-slate-200 transition-all ease-in-out duration-200"
          onClick={toggleTheme}
        >
          {theme === Themes.LIGHT ? <Sun /> : <Moon color="white" />}
        </button>
      </div>
    </div>
  );
}

export default Header;
