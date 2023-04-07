import { http } from "../http-common";
class MasterAttendanceServices {
    getloginDetails = async (time: any): Promise<any> => {
        return await http.post<any>("/v1/Reports/LoginTime", time);
    };
    getLogoutDetails= async (time: any): Promise<any> => {
        return await http.put<any>("/v1/Reports/LogoutTime", time);
    };
    getTodaysAttendance = async (time: any): Promise<any> => {

        return await http.get<any>("/v1/Reports/GetLoggedUserAttendance?LoginType=" +time);
    };
}
export const masterAttendanceServices = new MasterAttendanceServices();