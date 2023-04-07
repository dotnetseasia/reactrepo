import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import darkTheme from './theme/darkTheme';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Dashboard } from '@mui/icons-material';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import MainRoutes from './components/Routes'
import { FillUser, EmptyUser } from './store/authUser';
import { useDispatch, useSelector } from 'react-redux'
import secureLocalStorage from "react-secure-storage";
import { addMenu, EmptyMenu } from './store/menu';
import { useCookies } from 'react-cookie';
import * as signalR from "@microsoft/signalr";
import { UpdateMenuPermissionService } from './service/permissionService';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [cookies, setCookie,removeCookie] = useCookies(['AuthCookie']);
  if (!secureLocalStorage.getItem("session")) {
if(cookies.AuthCookie !=null && cookies.AuthCookie.token !=null){

}
else{
  dispatch(EmptyUser());
    localStorage.clear();
}
  
  }
  else {
    var sessionData = secureLocalStorage.getItem("session");
    dispatch(FillUser(sessionData));
    if (secureLocalStorage.getItem("authUserMenu")) {
      fillUserMenuPermission(secureLocalStorage.getItem("authUserMenu"));
    }
  }
  async function fillUserMenuPermission(menuArray: any) {
    dispatch(EmptyMenu());
    if (menuArray && menuArray.length > 0) {
      menuArray.map((menu: any) => {
        dispatch(addMenu(menu));
        const updateMenuPermissionService = new UpdateMenuPermissionService(menu);
      })
    }
  }
  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/** Inner container */}
        <MainRoutes />

      </ThemeProvider>

    </>
  );
}

export default App;
