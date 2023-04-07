import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "../config";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoMini from "../assests/images/logo-new-mini.svg";
import LogoSeasia from "../assests/images/logo-new.svg";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import HeaderNav from "./HeaderNav";
import { useEffect, useState } from "react";
import theme from "../theme/theme";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import * as Icons from "../assests/icons/icons";
import RemoveIcon from "@mui/icons-material/Remove";
import { Icon } from "@material-ui/core";
import MenuJson from "../assests/manu.json";
import { AppConstants } from "../config/AppConstants";
import { LeftMenuIcon } from "../components/styledComponent/LeftMenuIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from 'react-redux'
import { addMenu, EmptyMenu } from '../store/menu';
import UserDashboard from "../pages/UserDashboard";

const drawerWidth = 240;


const NavListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontSize: 15,
    fontWeight: 400,
    color: theme.palette.primary.dark,
  },
});
const SubNavListItem = styled(ListItemText)({
  margin: 0,
  "& .MuiListItemText-primary": {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.primary.dark,
  },
  "& .MuiListItemText-root": {
    margin: 0,
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  // width: `calc(${theme.spacing(8)} + 1px)`,
  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: "70px",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  "& img": {
    maxWidth: "100%",
    height: '48px',
  }
}));

const style = {
  navigationArea: {
    overflowY: "auto",
    overflowX: "hidden",
    padding: theme.spacing(1),
    "&::-webkit-scrollbar": {
      width: "0.2em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1px ",
      webkitBoxShadow: "inset 0 0 1px ",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "10px",
      // outline: '1px solid slategrey'
    },
  },
};
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - 70px)`,
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
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
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export interface ListActionMaster {
  actionName: string;
  actionId: string;
  displayOrder: number;
  isChecked: boolean;
}

export interface ListTabMaster {
  tabName: string;
  tabId: string;
  displayOrder: number;
  isChecked?: any;
  listActionMaster: ListActionMaster[];
}

export interface ListPageMaster {
  pageName: string;
  pageId: string;
  displayOrder: number;
  isChecked?: any;
  listTabMaster: ListTabMaster[];
}

export interface RootObject {
  moduleName: string;
  moduleId: string;
  displayOrder: number;
  isChecked?: any;
  listPageMaster: ListPageMaster[];
}
const Sidebar = (props: any) => {
  const navigate = useNavigate();
  const _authUser = useSelector((state: any) => state.AuthUserApp.AuthUser);
  const DynamicMenus =useSelector((state: any) => state.MenuApp.Menus);
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState<any>([]);
  const [currentLoggedInRole, setLoggedInRole] = useState("");
  const [currentScreen, setScreen] = useState("");
  useEffect(() => {
      setScreen("Dashboard");
    if (_authUser.typeOfUser) {
      let curreUserRole = _authUser.typeOfUser;
      curreUserRole = curreUserRole ? curreUserRole : "";
      setLoggedInRole(curreUserRole);
      //GetMenuForUser();
    }
  }, []);

  
  
  const GetMenuForUser = async () => {
    var data = MenuJson.listModuleMaster
      let sortedData = data.sort((a: any, b: any) => (a.displayOrder < b.displayOrder) ? -1 : 1);
      setUserRole(sortedData);
      dispatch(EmptyMenu());
      sortedData.map((menu: any) => {
        dispatch(addMenu(menu));
      })
      
  };
  const { open } = props;

  const [subopen, subListsetOpen] = React.useState(true);

  const handleClick = () => {
    subListsetOpen(!subopen);
  };

  const locationTyp = useLocation();
  const handleDrawerOpen = () => {
    props.setOpen(true);
    localStorage.setItem("userSidebar", "expanded");
  };

  const handleDrawerClose = () => {
    props.setOpen(false);
    let arr = [...userRole];
    arr.map((role: any) => {
      role.isOpen = false;
    })
    setUserRole(arr)
    localStorage.setItem("userSidebar", "collapase");
  };

  const useAuth = () => {
    const user = _authUser;//localStorage.getItem("user");
    if (user.id!="") {
      return true;
    } else {
      return false;
    }
  };
  const user = useAuth();
  const location = useLocation();
  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSidenavClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);

  };
  const handleActionClick = (selectedAction: any) => {
    setScreen(selectedAction);
  };

  const Sidenavopen = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const handleClose = (item: any) => {
    setAnchorEl(null);
    props.setOpen(false);
    localStorage.setItem("userSidebar", "expanded");
    let arr = [...DynamicMenus];
    arr.map((role: any) => {
      if (role.moduleName === item.moduleName) {
        role.isOpen = !role.isOpen;
      }
      else {
        role.isOpen = false;
      }
    })
    setUserRole(arr);
    //   props.setOpen(false);
  };
  const [dropOpen, setOpen] = React.useState(false);
  const [reportsOpen, setreportsOpen] = React.useState(false);
  const [notiOpen, setnotiOpen] = React.useState(false);

  const handleDropdownListBoxClick = (item: any) => {
    let arr = [...DynamicMenus];
    arr.map((role: any) => {
      if (role.moduleName === item.moduleName) {
        role.isOpen = !role.isOpen;
      }
      else {
        role.isOpen = false;
      }
    })
    setUserRole(arr);
    //   props.setOpen(false);
  };



  return (
    <>

      <AppBar
        position="fixed"
        elevation={0}
        open={open}
        sx={{ border: "none", }}
      >
        <Toolbar>
          {!open ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              sx={{
                "& img": {
                  maxWidth: "100%",
                  height: "48px",
                  marginRight: "10px",
                  [theme.breakpoints.up('sm')]: {
                    display: 'none'
                  },
                }
              }}
            >
              <img src={LogoMini} />   <MenuIcon />
              {/* {!open ? <MenuIcon onClick={handleDrawerOpen} /> : < ChevronLeftIcon onClick={handleDrawerClose} />} */}
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerClose}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontWeight: 700, ml: 1, [theme.breakpoints.down('sm')]: {
                display: 'none'
              },
            }}
          >
            {currentScreen}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <HeaderNav />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            border: "none",
          },
        }}
      >
        <DrawerHeader sx={{
          paddingLeft: "14px", pt: 1, mb: 1, [theme.breakpoints.down('sm')]: {
            visibility: 'hidden',
            mb: 0
          },
        }}>
          {open ? <img src={LogoSeasia} /> : <img src={LogoMini} />}
        </DrawerHeader>
        <Box sx={style.navigationArea}>
          {user && (
            <>

              {DynamicMenus.map(function (item: any, idx: any) {

                if (item.listPageMaster.length > 0) {
                  return (
                    <>
                      <ListItemButton
                        alignItems="flex-start"
                        onClick={() => handleDropdownListBoxClick(item)}
                        onMouseOver={handleDrawerOpen}
                        sx={{
                          "&.MuiListItemButton-root": {
                            // paddingLeft: '26px',
                            borderRadius: theme.spacing(1),
                            marginBottom: theme.spacing(0.5),
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: theme.palette.primary.dark,
                            minWidth: "30px",
                            marginTop: '5px',
                            "& svg": {
                              width: 20,
                              height: 20,
                            },
                          }}
                        >
                          <LeftMenuIcon
                            key={"menu_" + idx}
                            menuIconType={item.icon}
                          ></LeftMenuIcon>
                        </ListItemIcon>
                        <NavListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              {item.text}
                              <KeyboardArrowDown
                                sx={{
                                  opacity: !open ? 0 : 1,
                                  transform: item.isOpen
                                    ? "rotate(-180deg)"
                                    : "rotate(0)",
                                  transition: "0.3s",
                                }}
                              />{" "}
                            </Box>
                          }
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                      <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.listPageMaster.map((page: any) => (
                            <ListItemButton
                              component={Link}
                              key={page.text}
                              to={page.to}
                              onClick={handleClose}
                              sx={{
                                "&.MuiListItemButton-root": {
                                  // paddingLeft: '26px',
                                  borderRadius: theme.spacing(1),
                                  marginBottom: theme.spacing(0.5),
                                },
                                ml: 2,
                              }}
                              selected={location.pathname.includes(page.to)}
                            >
                              <SubNavListItem
                                primary={page.text}
                                onClick={() => handleActionClick(page.text)}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>

                    </>
                  )
                }
                else {
                  return (
                    <ListItemButton
                      onClick={() => handleActionClick(item.name)}
                      component={Link}
                      key={item.text}
                      to={item.to}
                      className={
                        location.pathname.includes(item.to)
                          ? "sidebar_active"
                          : ""
                      }
                      selected={location.pathname.includes(item.to)}
                      sx={{
                        "&.MuiListItemButton-root": {
                          // paddingLeft: '26px',
                          borderRadius: theme.spacing(1),
                          marginBottom: theme.spacing(0.5),
                          "&.Mui-selected": {
                            "& .MuiTypography-root": {
                              color: theme.palette.primary.main,
                            },
                            "& svg": {
                              "& path": {
                                fill: theme.palette.primary.main,
                              },
                            },
                          },
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: theme.palette.primary.dark,
                          minWidth: "30px",
                          marginTop: '5px',
                          "& svg": {
                            width: 20,
                            height: 20,
                          },
                        }}
                      >
                        {/* <item.icon /> */}
                        <LeftMenuIcon
                          key={"menu_" + idx}
                          menuIconType={item.icon}
                        ></LeftMenuIcon>
                      </ListItemIcon>
                      <NavListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>)
                }

              })}
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};
export default Sidebar;


