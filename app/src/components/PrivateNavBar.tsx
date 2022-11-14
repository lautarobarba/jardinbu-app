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
import { useCurrentUser } from "../features/auth/authHooks";

interface Props {
  handleSideBarChange: Function;
  drawerWidth: number;
}

export const PrivateNavBar = (props: Props) => {
  const { handleSideBarChange, drawerWidth } = props;

  const user = useCurrentUser();

  return (
    <MDBNavbar className="navbar fixed-top navbar-expand-md bg-dark">
      <div className="container-fluid">
        <div className="w-100 d-flex justify-content-between">
          <MDBNavbarBrand className="text-white" href="/app/admin">
            Biblioteca del Bosque
          </MDBNavbarBrand>
          <div style={{ cursor: 'pointer' }}>
            <MDBNavbarBrand className="text-white">{user?.email}</MDBNavbarBrand>
          </div>
        </div>
      </div>
    </MDBNavbar>
  );
};
