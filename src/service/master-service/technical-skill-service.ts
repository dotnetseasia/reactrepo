import { http } from "../http-common";
class TechnicalSkillService {
    getSkills = async (skils: any): Promise<any> => {
        return await http.post<any>("/v1/Master/TechnicalSkills/GetAll", skils);
    };
    getSkillsById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/TechnicalSkills/GetById?id=${id}`);
    };
    createSkill = async (skils: any): Promise<any> => {
        return await http.post<any>("/v1/Master/TechnicalSkills/Add", skils);
    };

    updateSkill = async (skils: any): Promise<any> => {
        return await http.put<any>("/v1/Master/TechnicalSkills/Update", skils);
    };

    deleteSkill = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/TechnicalSkills/DeleteById?id=${id}`);
    }

    getSearch = async (userse : any): Promise<any> => {
        return await http.post<any>("/v1/Master/TechnicalSkills/GetAll", userse);
    };     
}
export const technicalSkillService = new TechnicalSkillService();