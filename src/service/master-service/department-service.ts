import { http } from "../http-common";
class DepartmentService {
    getDepartment = async (depart: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Department/Search", depart);
    };
    getDepartmentById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Department/SearchbyId?id=${id}`);
    };
    createDepartment = async (depart: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Department/Add", depart);
    };

    updateDepartment = async (depart: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Department/Edit", depart);
    };

    deleteDepartment = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/Department/Delete?id=${id}`);
    }

    getSearch = async (userse : any): Promise<any> => {
        return await http.post<any>("/v1/Master/Department/Search", userse);
    }; 
}
export const departmentService = new DepartmentService();