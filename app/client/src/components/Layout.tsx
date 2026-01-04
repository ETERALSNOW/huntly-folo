import React, {useEffect, useMemo, useRef, useState} from "react";
import {CssBaseline, StyledEngineProvider, useMediaQuery} from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";
import Header from "./Header";
import {FilterPanelProvider} from "../contexts/FilterPanelContext";

const Layout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width:1024px)");
  const wasMobileRef = useRef<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('ui.sidebarCollapsed');
    if (stored != null) {
      setSidebarCollapsed(stored === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ui.sidebarCollapsed', sidebarCollapsed ? 'true' : 'false');
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (isMobile && !wasMobileRef.current) {
      setSidebarCollapsed(true);
    }
    wasMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    const rootEl = document.getElementById('root');
    rootEl?.classList.remove('toggle-sidebar');
  },[location]);
  const rootClassName = useMemo(() => `h-full layoutRoot folo-shell ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`, [sidebarCollapsed]);
  
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
      <FilterPanelProvider>
        <div className={rootClassName}>
          <Header onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} sidebarCollapsed={sidebarCollapsed} />
          <div className="main_window folo-shell__body flex flex-row">
            <div className={`main_sidebar folo-shell__sidebar folo-panel ${sidebarCollapsed ? 'is-collapsed' : ''}`}>
              <Sidebar collapsed={sidebarCollapsed}/>
            </div>
            <div className="flex-auto folo-shell__content">
              <Outlet/>
            </div>
          </div>
        </div>
      </FilterPanelProvider>
    </StyledEngineProvider>
  );
};

export default Layout;
