import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PrivateNavBar } from "../components/PrivateNavBar";
import { SideBar } from "../components/SideBar";
import { useUserIsAuthenticated } from "../features/auth/authHooks";

export const PrivateLayout = () => {

  // Redirecciono si el usuario ya esta autenticado
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

  const DRAWERWIDTH: number = 240;

  const handleSideBarChange = (state: boolean) => {
    setMenuState(state);
    localStorage.setItem("sidebar", JSON.stringify(state));
  };

  if(!isAuthenticated){
    return (<Navigate to="/app/auth/login" replace state={{ location }}/>); 
  }

  return (
    <>
      <PrivateNavBar
        handleSideBarChange={handleSideBarChange}
        drawerWidth={DRAWERWIDTH}
      />
      <SideBar
        handleSideBarChange={handleSideBarChange}
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
