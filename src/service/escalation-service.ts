import { http } from "./http-common";

class EscalationService {
    getListing = async (list: any): Promise<any> => {
        return await http.get<any>('/v1/Project/GetEsacalationList?Search=' + list);
    };
    getEscalationById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Project/GetEsacalationById?id=${id}`);
    };
    updateEscalation = async (comment: any): Promise<any> => {
        return await http.post<any>("/v1/Project/updateEsclation", comment);
      };

}
export const escalationService = new EscalationService();
