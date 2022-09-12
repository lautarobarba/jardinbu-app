import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const NavBar = (props: { handleSideBarChange: Function }) => {
  const openMenu = () => {
    props.handleSideBarChange(true);
  };

  const drawerWidth: number = 240;

  return (
    <AppBar position="sticky">
      <Toolbar style={{ paddingLeft: 0 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Menu izquierda */}
          <Grid item style={{ width: drawerWidth }}>
            <Toolbar>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Marca */}
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <Typography variant="h6">
                    <span className="">NOTAS</span>
                  </Typography>
                </Link>

                {/* MenuIcon para desktop */}
                <IconButton
                  onClick={openMenu}
                  className="{classes.menuButton}"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Toolbar>
          </Grid>

          {/* Menu derecha vista desktop */}
          <Grid item>
            <Toolbar>
              <IconButton className="{classes.menuButton}" color="inherit">
                <NotificationsIcon />
              </IconButton>

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton className="{classes.menuButton}" color="inherit">
                    <SettingsIcon />
                  </IconButton>

                  <IconButton className="{classes.menuButton}" color="inherit">
                    <ArrowDropDownIcon />
                  </IconButton>
                </Grid>
              </Box>
            </Toolbar>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
