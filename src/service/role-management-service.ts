import { Class } from "@mui/icons-material";
import { http } from "./http-common";
class RoleManagementServive {
  createRole = async (role: any): Promise<any> => {
    return await http.post<any>("/v1/RoleManagement/Add", role);
  };

  getRole = async (): Promise<any> => {
    var req = {
      status: "",
      search: "",
    };
    return await http.post<any>("/v1/RoleManagement/GetAll", req);
  };
  GetMenuForUser = async (): Promise<any> => {
    return await http.get<any>("/v1/RoleManagement/GetMenuForUser");
  };
  getRoleById = async (id: any): Promise<any> => {
    return await http.get<any>(`/v1/RoleManagement/` + id);
  };

  deleteRole = async (id: any): Promise<any> => {
    return await http.delete<any>(`/v1/RoleManagement/Delete?id=${id}`);
  };

  updateRole = async (Role: any): Promise<any> => {
   
    return await http.put<any>("/v1/RoleManagement/Update", Role);
  };

  copyFromToRole = async (data: any): Promise<any> => {
    return await http.post<any>("/v1/RoleManagement/RoleAccess/Copy", data);
  };

  GetMasterRole = async (): Promise<any> => {
    return await http.get<any>("/v1/RoleManagement/GetMasterRole");
  };
  GetRoleAccessByRoleId = async (id: any): Promise<any> => {
    return await http.get<any>(
      `/v1/RoleManagement/GetRoleAccessByRoleId?RoleId=${id}`
    );
  };
  UpdateRoleAccess = async (RoleAccess: any): Promise<any> => {
    return await http.post<any>(
      "/v1/RoleManagement/RoleAccess/Update",
      RoleAccess
    );
  };

  getSearch = async (userse: any): Promise<any> => {
    return await http.post<any>("/v1/RoleManagement/GetAll", userse);
  };
}

export const roleManagementServive = new RoleManagementServive();
