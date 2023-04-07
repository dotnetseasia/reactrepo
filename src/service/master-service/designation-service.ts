import { http } from "../http-common";
class DESIGNATIONSERVICE {
    getDesignations = async (desig: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Designation/GetAll", desig);
    };
    getDesignationsById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Designation/GetById?id=${id}`);
    };
    createDesignations = async (desig: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Designation/Add", desig);
    };

    updateDesignations = async (desig: any): Promise<any> => {
        return await http.put<any>("/v1/Master/Designation/Update", desig);
    };

    deleteDesignations = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/Designation/DeleteById?id=${id}`);
    }

    getSearch = async (userse : any): Promise<any> => {
        return await http.post<any>("/v1/Master/Designation/GetAll", userse);
    }; 
}
export const designationService = new DESIGNATIONSERVICE();