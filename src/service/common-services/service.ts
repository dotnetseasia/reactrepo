import { Class } from "@mui/icons-material";
import { Observable } from "@reduxjs/toolkit";
import { http } from "../http-common";
class CommonServive{
   
    getDropdownData = async (data : any): Promise<any> => {
        return await http.post<any>(
            "/v1/Master/DropdownData/GetByName", data
        );
    };
    getManagerName = async (data : any): Promise<any> => {
        return await http.post<any>(
            `/v1/Master/ManagerName/GetByDepartmentId?departmentId=` +data
        );
    }; 
    getResourcesByDepartment = async (data: any): Promise<any> => {
        return await http.post<any>(
            `/UserManagement/GetResourcesbyDepartmentId?departmentId=${data}`
        );
      }; 
}
export const commonServive = new CommonServive()

