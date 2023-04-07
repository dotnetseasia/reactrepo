import React from 'react';
import { useSelector } from 'react-redux';

import {Navigate, Outlet} from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';

const useAuth=()=>{
  const user=secureLocalStorage.getItem("session");
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=(props:any) =>{

  const auth=useAuth()

  return auth?<Navigate to="/dashboard"/>: <Outlet/>
}

export default PublicRoutes;