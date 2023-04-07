import { http } from "../http-common";
class MasterLeaveServices {
    getLeaves = async (leave: any): Promise<any> => {
        return await http.post<any>("/v1/LeaveManagement/GetAllMasterLeaveDetails", leave);
    };
    
    getLeaveById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/LeaveManagement/SearchMasterLeaveDetailById?id=${id}`);
    };

    createLeave = async (leave: any): Promise<any> => {
        return await http.post<any>("/v1/LeaveManagement/AddMasterLeave", leave);
    };

    updateLeave = async (leave: any): Promise<any> => {
        return await http.put<any>("/v1/LeaveManagement/UpdateMasterLeave", leave);
    };
 
    deleteLeave= async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/LeaveManagement/DeleteMasterLeaveDetail?id=${id}`);
    }

}
export const masterleaveServices = new MasterLeaveServices();