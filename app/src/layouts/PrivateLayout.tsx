import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

export const PrivateLayout = () => {
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