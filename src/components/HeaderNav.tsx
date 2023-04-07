import React, { useEffect, useState } from "react";
import * as Icons from "../assests/icons/icons";
import { styled, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import theme from "../theme/theme";
import Drawer from "@mui/material/Drawer";
import { CloseNotify } from "../assests/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { EmptyMenu } from "../store/menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "material-react-toastify";
import { masterAttendanceServices } from "../service/master-service/attendance-servics";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { EmptyUser } from "../store/authUser";
import secureLocalStorage from "react-secure-storage";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ItemsHeaderNav = styled(Box)((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const styleCross = {
  position: "absolute" as "absolute",
  right: "5px",
  top: "5px",
};

const ButtonsHeader = styled(IconButton)((props) => ({
  marginRight: "2rem",
  color: theme.palette.primary.dark,
  width: 36,
  alignItems: "baseline",
  height: 36,
  "& svg": {
    width: 20,
    height: 20,
  },
}));

enum LoginTypeEnum {
  SeasiaTracker = 1,
  SeasiaConnectPortal = 2,
}

export default function HeaderNav() {
  const _authUser = useSelector((state: any) => state.AuthUserApp.AuthUser);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [localUserId, setLocalUserId] = useState("");
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget); 
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const useAuth = () => {
    const user = secureLocalStorage.getItem("session");
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  const isTrackerRequired = _authUser.employeeInfo.isTrackerRequired;
  const dispatch = useDispatch();
  const locationTyp = useLocation();
  const user = useAuth();
  const location = useLocation();
  const navigation = useNavigate();
  
  const [localUserName, setLocalUserName] = useState(
    _authUser.employeeInfo.currentUserName
  );
  const [localDesignation, setlocalDesignation] = useState(
    _authUser.designation
  );
  //alert(localStorage.getItem("userId"));

  const logout = () => {
    secureLocalStorage.clear();
    dispatch(EmptyMenu());
    dispatch(EmptyUser());
    window.location.reload();
  };

  const settings = [
    {
      name: "Profile",
      path: `/users/user-profile/${localUserId}`,
      isShow: true,
    },
    { name: "Change Password", path: "/change-password", isShow: true },
    { name: "Account", path: "", isShow: false },
  ];
  const styleCommentTitle = {
    color: theme.palette.primary.dark,
    fontWeight: 500,
    margin: 0,
  };

  const styleCommentIconOrange = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: theme.palette.warning.light,
    color: theme.palette.warning.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    marginRight: "0.5rem",
  };
  useEffect(() => {
    getAttendanceTime();
    setLocalUserId(_authUser.id);
  });

  const [drawerOpen, setOpen] = useState(false);

  const [ticketdrawerOpen, setTicketOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const[isUserOnLeave, setIsUserOnLeave] = useState(false);

  const handleChange = (event: any) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      loginTimeData();
    } else {
      alertLogout();
    }
  };

  const [openAlert, setAlertOpen] = React.useState(false);

  const handleClickOpenAlert = () => {
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const loginTimeData = async () => {
    try {
      var req = {
        loginType: 2,
      };
      await masterAttendanceServices
        .getloginDetails(req)
        .then((response: any) => {
          toast.success("Login Successfully ");
          getAttendanceTime();
        });
    } catch (ex: any) {
      ex.data.Error.map((err: any, idx: any) => {
        toast.warning(err);
      });
    }
  };

  const alertLogout = async () => {
    // e.stopPropagation();
    setAlertOpen(true);
  };

  const logOutTimeData = async () => {
    try {
      var req = {
        loginType: 2,
      };
      await masterAttendanceServices
        .getLogoutDetails(req)
        .then((response: any) => {
          toast.success("LogOut successfully");
          setAlertOpen(false);
          getAttendanceTime();
        });
    } catch (ex: any) {
      ex.data.Error.map((err: any, idx: any) => {
        toast.warning(err);
      });
    }
  };

  const getAttendanceTime = async () => {
    try {
      await masterAttendanceServices
        .getTodaysAttendance("2")
        .then((response: any) => {
          if (!response.data.isError) {
            setLoginTime(response?.data.loginTime);
            setLogoutTime(response?.data.logoutTime);
            setIsUserOnLeave(response?.data.isUserOnLeave)
            setIsChecked(
              !!response?.data.loginTime && !response?.data.logoutTime
            );
          }
        });
    } catch (ex: any) {
      ex.data.Error.map((err: any, idx: any) => {
        toast.warning(err);
      });
    }
  };

  return (
    <>
      <ItemsHeaderNav>
        {/* <ButtonsHeader sx={{ mr: 2 }}>
                    <Icons.Search />
                </ButtonsHeader>
                <ButtonsHeader
                    aria-label="show 17 new notifications"
                    color="inherit"
                    sx={{
                        color: theme.palette.primary.dark,
                    }}
                >
                    <Badge badgeContent={17} color="error" >
                        <Icons.Bell />
                    </Badge>
                </ButtonsHeader> */}

        {isTrackerRequired === false && (
            isUserOnLeave == false && 
            ( 
          <Box>
            {
              <FormControlLabel
                control={
                  <IOSSwitch
                    disabled={!!logoutTime}
                    checked={isChecked}
                    onChange={handleChange}
                    sx={{ m: 1 }}
                  />
                }
                label={
                  <Box>
                    {" "}
                    <Typography
                      variant="subtitle2"
                      sx={{ lineHeight: 1, mb: 0 }}
                    >
                      {loginTime ? `Login: ${loginTime}` : ""}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ lineHeight: 1, mb: 0 }}
                    >
                      {" "}
                      {logoutTime ? `Logout: ${logoutTime}` : ""}
                    </Typography>
                  </Box>
                }
                sx={{
                  "&.MuiFormControlLabel-root": {
                    color: theme.palette.primary.main,
                  },
                  mr: 3,
                  [theme.breakpoints.down("sm")]: {
                    mr: 0.5,
                  },
                }}
              />
            }
          </Box>
          ) 
        )}

        {/* <ButtonsHeader
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Box component={Link} to="/column-management"> <Icons.Settings /></Box>
                </ButtonsHeader> */}
        {/* <ButtonsHeader
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    sx={{color: theme.palette.primary.dark, '& svg path' :{
                        fill: theme.palette.primary.dark
                    }}}
                >
                    <Icons.ThemeMode />
                </ButtonsHeader> */}
        <Stack
          direction="row"
          alignItems="center"
          onClick={handleOpenUserMenu}
          sx={{ cursor: "pointer" }}
        >
          <Stack sx={styleCommentIconOrange}>
            {localUserName.charAt(0).toUpperCase()}
          </Stack>

          <Box
            sx={{
              mr: 2,
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                textTransform: "capitalize",
              }}
            >
              {localUserName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              {/* Master */}
              {localDesignation}
            </Typography>
          </Box>
          <KeyboardArrowDownIcon />
        </Stack>

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
          {settings
            .filter((a) => a.isShow)
            .map((setting) => (
              <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                <Typography
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.grey[700],
                  }}
                  component={Link}
                  to={setting.path}
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          <MenuItem onClick={handleCloseUserMenu}>
            {location.pathname !== "/login" && (
              <Typography
                sx={{ textDecoration: "none", color: theme.palette.grey[700] }}
                component={Link}
                to="/"
                onClick={logout}
              >
                Logout
              </Typography>
            )}
          </MenuItem>
        </Menu>
      </ItemsHeaderNav>

      <Box
        sx={{
          position: "fixed",
          right: "-5px",
          top: "10%",
          display: drawerOpen ? "none" : "",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <Icons.RigthNotify />
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiBackdrop-root ": {
            backgroundColor: "transparent",
            overflow: "initial",
          },

          "& .MuiPaper-root": {
            overflow: "initial",
          },
        }}
      >
        <Box
          sx={{
            position: " absolute",
            left: " -47px",
            top: " 70px",
            cursor: "pointer",
          }}
          onClick={() => setOpen(false)}
        >
          <CloseNotify />
        </Box>
        <Box sx={{ height: "64px", padding: "32px" }}></Box>
      </Drawer>

      <Dialog
        open={openAlert}
        onClose={setAlertOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <IconButton
          aria-label="delete"
          sx={styleCross}
          onClick={handleCloseAlert}
        >
          <ClearIcon />
        </IconButton>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "26px",
            lineHeight: "39px",
            color: "#212121",
          }}
        >
          LogOut
        </DialogTitle>
        <DialogContent sx={{ pt: 1, fontSize: "24px", color: "#424242" }}>
          Are you sure you want to LogOut ?
        </DialogContent>
        <DialogActions
          sx={{ p: 3, pt: 0, textAlign: "center", justifyContent: "center" }}
        >
          <Button variant="outlined" onClick={handleCloseAlert}>
            No
          </Button>
          <Button variant="contained" onClick={logOutTimeData}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
