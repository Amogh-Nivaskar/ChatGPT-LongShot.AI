import { Outlet, useLocation } from "react-router-dom";

import { useTheme } from "../contexts/theme";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";
import Header from "./Header";
import { useSelector } from "react-redux";
import { getSidebarStatus } from "../store/slices/chatapp";

function Root() {
  const { theme } = useTheme();
  const location = useLocation();
  const isSidebarOpen = useSelector(getSidebarStatus);

  const isAtRootPath = location.pathname === "/";
  return (
    <div className={`${theme} flex min-h-screen`}>
      <Header />
      <div className={`${!isSidebarOpen && "hidden sm:block"} `}>
        <Sidebar />
      </div>

      <div
        className={`${
          isSidebarOpen && "hidden"
        } dark:bg-slate-600 bg-slate-100 w-full`}
      >
        {isAtRootPath ? <Home /> : <Outlet />}
      </div>
    </div>
  );
}

export default Root;
