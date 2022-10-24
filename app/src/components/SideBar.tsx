import {
  Drawer,
  // Toolbar,
  // List,
  // Typography,
  // IconButton,
  // ListItem,
  // ListItemIcon,
  // ListItemText,
  // AppBar,
  // Grid
} from "@mui/material";
// import { Link } from "react-router-dom";

interface Props {
  handleSideBarChange: Function;
  drawerWidth: number;
  menuState: boolean;
}

export const SideBar = (props: Props) => {
  const { handleSideBarChange, drawerWidth, menuState } = props;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={menuState}
    ></Drawer>
  );
};
