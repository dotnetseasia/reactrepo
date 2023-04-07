import { http } from "../http-common";
class LabelService {
    getLabel = async (label: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Label/GetAll", label);
    };
    getLabelById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Label/GetById?id=${id}`);
    };
    createLabel = async (label: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Label/Add", label);
    };

    updateLabel = async (label: any): Promise<any> => {
        return await http.put<any>("/V1/Master/Label/Update", label);
    };

    deleteLabel = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/Label/DeleteById?id=${id}`);
    }

    getSearch = async (userse : any): Promise<any> => {
        return await http.post<any>("/v1/Master/Label/GetAll", userse);
    }; 
}
export const labelService = new LabelService();