import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import GroommeIcon from "../../assets/icons/common/GroommeIcon";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { logoutService } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import {
  openRouteConstants,
  salonRouteConstants,
} from "../../routes/routeConstants";
import Box from "@mui/material/Box";
import useLoggedInUserDetails from "../../hooks/useLoggedInUserDetails";
import SalonHeaderMenu from "./SalonHeaderMenu";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 260;
const CustomSalonHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#FFF",
  color: "#000",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function SalonHeader({ open, setOpen }: { setOpen: Function; open: boolean }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  async function handleLogOutSuccess() {
    localStorage.clear();
    sessionStorage.clear();
    navigate(openRouteConstants.home);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
    // handleOpenNavMenu(e);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  function handleProfileClick() {
    navigate(salonRouteConstants.salonUserProfile);
  }
  async function handleLogoutClick() {
    await logoutService(handleLogOutSuccess);
    window.location.reload();
  }
  const settings = [
    { id: "profileBtn", label: "Profile", onClick: () => handleProfileClick() },
    { id: "logoutBtn", label: "Logout", onClick: () => handleLogoutClick() },
  ];
  const handleCloseUserMenu = async () => {
    setAnchorElUser(null);
  };

  const { loggedInUserDetails } = useLoggedInUserDetails();
  return (
    <CustomSalonHeader>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <SalonHeaderMenu />
          </Menu>

          {!open && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                width: "70px",
                display: { xs: "none", md: "flex" },
              }}
            >
              <GroommeIcon />
            </IconButton>
          )}
          <Box
            sx={{
              flexGrow: 1,
              gap: 3,
              display: { md: "flex" },
            }}
          >
            {/* <SalonHeaderMenu /> */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={loggedInUserDetails.firstName}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={setting.onClick}>
                  <Typography textAlign="center" sx={{ color: "#000" }}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>{" "}
    </CustomSalonHeader>
  );
}

export default SalonHeader;
