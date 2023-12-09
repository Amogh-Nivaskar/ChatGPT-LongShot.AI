import { Outlet, useLocation } from "react-router-dom";

import { useTheme } from "../contexts/theme";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";
import Header from "./Header";

function Root() {
  const { theme } = useTheme();
  const location = useLocation();

  const isAtRootPath = location.pathname === "/";
  return (
    <div className={`${theme} flex`}>
      <Header />
      <Sidebar />
      <div className="dark:bg-slate-600 bg-slate-100 w-full h-full">
        {isAtRootPath ? <Home /> : <Outlet />}
      </div>
    </div>
  );
}

export default Root;
