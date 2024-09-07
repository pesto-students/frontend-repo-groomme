import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GroommeIcon from "../../assets/icons/common/GroommeIcon";
import { logoutService } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import {
  customerRouteConstants,
  openRouteConstants,
} from "../../routes/routeConstants";
import { Button } from "@mui/material";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import useLoggedInUserDetails from "../../hooks/useLoggedInUserDetails";

function CustomerHeader({
  isLandingPage,
  renderCommonHeader,
}: {
  isLandingPage: boolean;
  renderCommonHeader?: any;
}) {
  const settings = [
    { id: "profileBtn", label: "Profile", onClick: () => handleProfileClick() },
    { id: "logoutBtn", label: "Logout", onClick: () => handleLogoutClick() },
  ];
  const { loggedInUserDetails } = useLoggedInUserDetails();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  async function handleLogOutSuccess() {
    localStorage.clear();
    sessionStorage.clear();
    navigate(openRouteConstants.home);
  }

  function handleProfileClick() {
    navigate(customerRouteConstants.userProfile);
  }

  async function handleLogoutClick() {
    await logoutService(handleLogOutSuccess);
    window.location.reload();
  }
  const handleCloseUserMenu = async () => {
    setAnchorElUser(null);
  };
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const userType = sessionStorage.getItem("userType");
    setIsUserLoggedIn(!!userType);
  }, []);
  return (
    <AppBar
      position={isLandingPage ? "sticky" : "static"}
      sx={{
        backgroundColor: isLandingPage ? "#000" : "#FFF",
        color: isLandingPage ? "#FFF" : "#000",
        width: "100%",
      }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, width: "70px", display: { xs: "none", md: "flex" } }}
        >
          <GroommeIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
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
            {isUserLoggedIn ? (
              <CustomerHeaderMenu isLandingPage={isLandingPage} />
            ) : (
              typeof renderCommonHeader === "function" && renderCommonHeader()
            )}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, gap: 3, display: { xs: "none", md: "flex" } }}>
          {isUserLoggedIn ? (
            <CustomerHeaderMenu isLandingPage={isLandingPage} />
          ) : (
            typeof renderCommonHeader === "function" && renderCommonHeader()
          )}
        </Box>
        {isUserLoggedIn ? (
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
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => navigate(openRouteConstants.SignUp)}
              variant="text"
              sx={{
                color: "#D4740F",
                "&:hover": {
                  backgroundColor: "#BF610C",
                  color: "white",
                },
              }}
            >
              Register
            </Button>
            <Button
              onClick={() => navigate(openRouteConstants.SignIn)}
              sx={{
                backgroundColor: "#D4740F",
                color: "white",
                "&:hover": {
                  backgroundColor: "#BF610C",
                },
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default CustomerHeader;
