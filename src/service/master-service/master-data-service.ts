import { boolean } from "yup";
import AppConstants from "../../config/AppConstants";
import { http } from "../http-common";
class MasterDataService {
  getAllActiveSkills = async (): Promise<any> => {
    var req = {
      status: "active",
      search: "",
    };
    return await http.post<any>("/v1/Master/TechnicalSkills/GetAll", req);
  };
  getAllActiveUsers = async (): Promise<any> => {
    var req = {
      department: "",
      status: "active",
      search: "",
      take: 100,
      skip: 0,
    };
    return await http.post<any>("/UserManagement/GetAllUsers", req);
  };

  getDepartment = async (depart: any): Promise<any> => {
    return await http.post<any>("/v1/Master/Department/Search", depart);
  };
  GetActionbypageId = async (pageId: any): Promise<any> => {
    return await http.get<any>(`/v1/RoleManagement/GetActionbypageId?PageId=${pageId}`);
  };
  getActiveProjects = async (): Promise<any> => {
    var req = {
      "skip": 0,
      "take": 1000,
      "status": 0,
      "search": "",
    };
    return await http.post<any>("/v1/Project/GetProjectDetails", req);
  };

  GetIssueDetailByProject = async (projectId: any): Promise<any> => {
    var req = {
      "projectId": projectId
    }
    return await http.post<any>("/v1/Ticket/GetAll", req);
  };

  getAllActiveLabels = async (): Promise<any> => {
    var req = {
      status: "active",
      search: "",
    };
    return await http.post<any>("/v1/Master/Label/GetAll", req);
  };

  // getAllActiveSummary = async (): Promise<any> => {
  //   var req = {
  //     status: "active",
  //     search: "",
  //   };
  //   return await http.get<any>("/v1/Ticket/GetById", req);
  // };

  getAllActiveSummary = async (ticketId: any): Promise<any> => {
    return await http.get<any>("/v1/Ticket/GetById?Id=" + ticketId);
  };

  GetSprintDetailByProject = async (projectId: any): Promise<any> => {
    var req = {
      "projectId": projectId
    }
    return await http.post<any>("/Sprint/GetAllSprint/Sprint/GetAll", req);
  };

  isValidUser = (pageId: any) => {
    http.get<any>(`/v1/RoleManagement/GetActionbypageId?PageId==${pageId}`).then((response: any) => {
      if (response.data.isError) {
        return false;
      }
      else {
        return true;
      }
    })
  };
  isAuthorizedUser = (screenInfo: any)  : any => {
     http.get<any>(`/v1/RoleManagement/GetActionbypageId?PageId=${screenInfo.pageId}`).then((response: any) => {
      if (response.data.isError) {
        return false;
      }
      else {
        response = response.data;
        var data = response.listTabMaster.filter((x: any) => x.tabId == screenInfo.tabId);
        if (!data.listActionMaster) {
          data = data.filter((x: any) => x.tabId == screenInfo.tabId);
          data = data[0].listActionMaster;
        }
        else 
          data = data.listActionMaster;

        var allowedAction = {
          add: this.isActionAlowed(data, screenInfo.actionIds.add),
          edit: this.isActionAlowed(data, screenInfo.actionIds.edit),
          view: this.isActionAlowed(data, screenInfo.actionIds.view),
          delete: this.isActionAlowed(data, screenInfo.actionIds.delete),
        }
        return allowedAction;
      }
    })
  }

  isAuthorizeUser = (data: any, screenInfo: any) => {
    data = data.listTabMaster.filter((x: any) => x.tabId == screenInfo.tabId);
    if (!data.listActionMaster) {
      data = data.filter((x: any) => x.tabId == screenInfo.tabId);
      data = data[0].listActionMaster;
    }
    else {
      data = data.listActionMaster;
    }
   
    return data;
  }
  isActionAlowed = (data: any, actionId: string) => {
    var res = data.filter((d: any) => d.actionId == actionId);
    if (res.length > 0)
      return res = res[0].isChecked;
    else
      return false;
  };
  UploadUserDocument = async (data : any): Promise<any> => {
    return await http.post<any>("/UserManagement/UploadUserDocument", data);
};
}
export const masterDataService = new MasterDataService();
