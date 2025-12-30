import React, {useEffect} from "react";
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    const rootEl = document.getElementById('root');
    rootEl?.classList.remove('toggle-sidebar');
  },[location]);
  
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline/>
      <ScrollRestoration
        getKey={(location, matches) => {
          const paths = ["/"];
          // const paths = ["/", "/list","/starred","/later","/archive"];
          return paths.includes(location.pathname)
            ? // home and some paths restore by pathname
            location.pathname
            : // everything else by location like the browser
            location.key;
        }}
      />
      <div className="h-full layoutRoot folo-shell">
        <Header />
        <div className="main_window folo-shell__body flex flex-row">
          <div className="main_sidebar folo-shell__sidebar folo-panel">
            <Sidebar/>
          </div>
          <div className="flex-auto folo-shell__content">
            <Outlet/>
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Layout;
