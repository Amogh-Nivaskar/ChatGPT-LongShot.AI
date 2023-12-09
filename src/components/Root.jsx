import { Outlet, useLocation } from "react-router-dom";

import { useTheme } from "../contexts/theme";
import Sidebar from "./sidebar";
import Home from "../pages/home";

function Root() {
  const { theme } = useTheme();
  const location = useLocation();

  const isAtRootPath = location.pathname === "/";
  return (
    <div className={`${theme} flex`}>
      <Sidebar />
      <div className="dark:bg-slate-600 w-full  ">
        {isAtRootPath ? <Home /> : <Outlet />}
      </div>
    </div>
  );
}

export default Root;
