import { http } from "../http-common";
class BrownieEmployeeService {
  addRedeemForm = async (data: any): Promise<any> => {
    return await http.post<any>("/v1/BrownieReason/AddRedeemPoints", data);
  };

  addRequestRewardsPoints = async (data: any): Promise<any> => {
    return await http.post<any>(
      "/v1/BrownieReason/AddRequestRewardPoint",
      data
    );
  };

  GetResourcesbyDepartmentId = async (data: any): Promise<any> => {
    return await http.post<any>(
      "/UserManagement/GetResourcesbyDepartmentId?departmentId=" + data
    );
  };
  GetManagerByDepartmentId = async (data: any): Promise<any> => {
    return await http.post<any>(
      "/v1/Master/ManagerName/GetByDepartmentId?departmentId=" + data
    );
  };

  // GetRedeemHistoryById = async (UserId: any): Promise<any> => {
  //   return await http.get<any>(
  //     `/v1/BrownieReason/GetRedeemHistory?UserId=${UserId}`
  //   );
  // };

  GetRedeemHistoryById = async (redeem: any): Promise<any> => {
    return await http.post<any>("/v1/BrownieReason/GetRedeemHistory", redeem);
  };

  getDepartManagerName = async (data: any): Promise<any> => {
    return await http.post<any>(
      `/v1/Master/ManagerName/GetByDepartmentId?departmentId=` + data
    );
  };

  getDropdownData = async (data: any): Promise<any> => {
    return await http.post<any>("/v1/Master/DropdownData/GetByName", data);
  };

  getUsers = async (user: any): Promise<any> => {
    return await http.post<any>("/UserManagement/GetAllUsers", user);
  };

  getAllProject = async (actionType: any): Promise<any> => {
    var req = {
      skip: 0,
      take: 100,
      status: actionType,
    };
    return await http.post<any>("/v1/Project/GetProjectDetails", req);
  };

  // /api/v1/BrownieReason/GetAllBrownieReason

  getAllReasonPointsData = async (): Promise<any> => {
    return await http.post<any>("v1/BrownieReason/GetAllBrownieReason");
  };

  getAllRewardPointWithStatus = async (data: any): Promise<any> => {
    return await http.post<any>(
      "/v1/BrownieReason/GetAllRewardPointWithStatus",
      data
    );
  };

  getAllReferPointWithStatus = async (data: any): Promise<any> => {
    return await http.post<any>(
      "/v1/BrownieReason/GetAllRecommendRewards",
      data
    );
  };
}
export const brownieemployeeservice = new BrownieEmployeeService();
