import { useDispatch } from "react-redux";
import { http } from "./http-common";




export const login = async (data: any): Promise<any> => {
  return await http.post<any>("/UserManagement/Login", data);
};


class ChangePasswordService {
  changePassword = async (data: any): Promise<any> => {
    return await http.post<any>("/UserManagement/ChangePassword/ChangePassword", data);
  };
}
export const changePasswordService = new ChangePasswordService();

// class MenuService{
//    dispatch = useDispatch();
//   addMenuesToStore=async (menu:any)=>{
//     
//   }
// }
// export const menuService = new MenuService();