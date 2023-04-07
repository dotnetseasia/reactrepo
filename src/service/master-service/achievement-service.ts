import { http } from "../http-common";
class AchievementService {
    getAchievement = async (achieve: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Achievement/GetAll", achieve);
    };
    getAchievementById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Achievement/GetbyId?id=${id}`);
    };
    createAchievement = async (achieve: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Achievement/Add", achieve);
    };

    updateAchievement = async (achieve: any): Promise<any> => {
        return await http.put<any>("/v1/Master/Achievement/Update", achieve);
    };

    deleteAchievement = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/Achievement/DeleteById?id=${id}`);
    }

    getSearch = async (userse : any): Promise<any> => {
        return await http.post<any>("/v1/Master/Achievement/GetAll", userse);
    }; 
}
export const achievementService = new AchievementService();