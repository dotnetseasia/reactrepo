import React from "react"
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom"
import secureLocalStorage from "react-secure-storage";

const useAuth = () => {
    let user: any=secureLocalStorage.getItem("session");
    //const _user =_authUser; //localStorage.getItem("user")

    if (user) {
        return {
            auth: true,
            role: user.role,
        }
    } else {
        return {
            auth: false,
            role: null,
        }
    }
}

//protected Route state
type ProtectedRouteType = {
    roleRequired?: "ADMIN" | "USER"
}

const ProtectedRoutes = (props: ProtectedRouteType) => {
    const { auth, role } = useAuth()
    //if the role required is there or not
    if (props.roleRequired) {
        return auth ? (
            props.roleRequired === role ? (
                <Outlet />
            ) : (
                <Navigate to="/denied" />
            )
        ) : (
            <Navigate to="/login" />
        )
    } else {
        return auth ? <Outlet /> : <Navigate to="/login" />
    }
}

export default ProtectedRoutes