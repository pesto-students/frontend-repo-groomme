import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Typography } from "@mui/material";
import salonsRoutesArray from "../../routes/salonRoutes";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#FFF3E7",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#FFF3E7",
    },
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

function SalonDrawer({ open, setOpen }: { open: boolean; setOpen: Function }) {
  const theme = useTheme();

  const location = useLocation();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "bold",
            fontSize: "2rem",
            color: "#D4740F",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            letterSpacing: "0.1rem",
            ml: 4,
          }}
        >
          Groomme
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {salonsRoutesArray.map((salonRoute) => {
          const MenuIcon = salonRoute.Icon;
          return (
            <ListItem
              key={salonRoute.id}
              disablePadding
              sx={{
                display: "block",
                backgroundColor:
                  location.pathname === salonRoute.path ? "#D4740F" : "",
                color: location.pathname === salonRoute.path ? "#FFF" : "#000",
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(salonRoute.path);
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText
                  primary={salonRoute.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SalonDrawer;
