import {
  // MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  // MDBNavbarToggler,
  // MDBIcon,
  // MDBNavbarNav,
  // MDBNavbarItem,
  // MDBNavbarLink,
  // MDBBtn,
  // MDBDropdown,
  // MDBDropdownToggle,
  // MDBDropdownMenu,
  // MDBDropdownItem,
  // MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

interface Props {
  handleSideBarChange: Function;
  drawerWidth: number;
}

export const NavBar = (props: Props) => {
  const { handleSideBarChange, drawerWidth } = props;

  return (
    <MDBNavbar className="navbar fixed-top navbar-expand-md bg-dark">
      <div className="container-fluid">
        <div className="w-100 d-flex justify-content-between">
          <MDBNavbarBrand className="text-white" href="/app">
            JBU
          </MDBNavbarBrand>
          <MDBNavbarBrand className="text-white">Avatar</MDBNavbarBrand>
        </div>
      </div>
    </MDBNavbar>
  );
};
