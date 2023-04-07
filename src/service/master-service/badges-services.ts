import { http } from "../http-common";
class BadgesServices {
    getBadges = async (): Promise<any> => {
        return await http.get<any>("/v1/Master/Badges/Search");
    };
    getBadgesById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Badges/SearchbyId?id=${id}`);
    };
    createBadges = async (badg: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Badges/Add", badg);
    };

    updateBadges = async (badg: any): Promise<any> => {
        return await http.put<any>("/v1/Master/Badges/Edit", badg);
    };

    deleteBadges = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/Badges/Delete?id=${id}`);
    }
}
export const badgesService = new BadgesServices();