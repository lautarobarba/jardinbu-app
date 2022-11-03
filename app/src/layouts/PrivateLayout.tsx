import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { selectCurrentSession } from "../features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

export const PrivateLayout = () => {

  // Recupero la session actual de la storage 
  //  para saber si el usuario esta autenticado
  const logueado = useAppSelector(selectCurrentSession);
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

  // Si el usuario esta logueado lo redirecciono al dashboard
  if(!logueado){
    return (<Navigate to="/app/auth/login" replace state={{ location }}/>); 
  }

  return (
    <>
      <NavBar
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
        <p>DASHBOARD LAYOUT</p>
        <Outlet />
      </div>
    </>
  );
};
