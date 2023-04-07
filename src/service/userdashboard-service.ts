import { http } from "./http-common";
class UserDashboardServices {
    getUserDetails = async (id: any): Promise<any> => {
        return await http.post<any>(`/v1/Dashboard/ProjectsByUserId?UserId=${id}`);
    };
    
    getDataById = async (demo: any): Promise<any> => {
        return await http.post<any>("/v1/Dashboard/GetUserDashboardDetailsByProjectId",demo);
    };
}
export const userdashboardservices = new UserDashboardServices();