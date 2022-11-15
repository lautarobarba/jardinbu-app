import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PrivateNavBar } from "../components/PrivateNavBar";
import { SideBar } from "../components/SideBar";
import { useUserIsAuthenticated } from "../features/auth/authHooks";

export const PrivateLayout = () => {

  // Redirecciono si el usuario no esta autenticado
  const isAuthenticated = useUserIsAuthenticated();
  const location = useLocation();
  
  const getSideBarLastState = () => {
    const sideBarData: string | null = localStorage.getItem("sidebar");
    if (sideBarData) {
      const sideBar: boolean = Boolean(JSON.parse(sideBarData));
      return sideBar;
    }
    return false;
  };

  const [menuState, setMenuState] = useState<boolean>(getSideBarLastState());
  // const [menuState, setMenuState] = useState<boolean>(true);

  const DRAWERWIDTH: number = 250;

  const toggleSideBar = () => {
    const prevState = menuState;
    setMenuState(!prevState);
    localStorage.setItem("sidebar", JSON.stringify(!prevState));
  };

  if(!isAuthenticated){
    return (<Navigate to="/app/auth/login" replace state={{ location }}/>); 
  }

  return (
    <>
      <PrivateNavBar
        toggleSideBar={toggleSideBar}
        drawerWidth={DRAWERWIDTH}
      />
      <SideBar
        toggleSideBar={toggleSideBar}
        drawerWidth={DRAWERWIDTH}
        menuState={menuState}
      />
      <div>
        <div id="nav-bar-spacer" className="" style={{ height: "65px" }}></div>
        {/* <p>DASHBOARD LAYOUT</p> */}
        <Outlet />
      </div>
    </>
  );
};
