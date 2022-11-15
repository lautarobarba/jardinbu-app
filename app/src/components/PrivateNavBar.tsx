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
import { MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { useCurrentUser } from "../features/auth/authHooks";

interface Props {
  toggleSideBar: Function;
  drawerWidth: number;
}

export const PrivateNavBar = (props: Props) => {
  const { toggleSideBar, drawerWidth } = props;

  const user = useCurrentUser();

  return (
    <MDBNavbar className="navbar fixed-top navbar-expand-md bg-dark" style={{paddingLeft: 24}}>
      {/* <div className="container-fluid"> */}
        <div className="w-100 d-flex justify-content-between">

          {/* Left side */}
          {/* <div className="d-flex" style={{ width: drawerWidth }}>
            <MDBNavbarBrand className="text-white" href="/app/admin">
              Biblioteca
            </MDBNavbarBrand>
            <MDBIcon 
              icon='bars' 
              size='lg' 
              className="text-white" 
              style={{ marginTop: 'auto', marginBottom: 'auto' }} 
              onClick={toggleSideBar}
            />
          </div> */}
          <div className="d-flex justify-content-between" style={{ width: drawerWidth - 48 }}>
            <MDBNavbarBrand className="text-white" href="/app/admin">
              Biblioteca
            </MDBNavbarBrand>
            <MDBIcon
              icon='bars' 
              size='lg' 
              className="text-white" 
              style={{ marginTop: 'auto', marginBottom: 'auto' }} 
              onClick={toggleSideBar}
            />
          </div>

          {/* Right side */}
          <div style={{ cursor: 'pointer' }}>
            <MDBNavbarBrand className="text-white">{user?.email}</MDBNavbarBrand>
          </div>
        </div>
      {/* </div> */}
    </MDBNavbar>
  );
};
