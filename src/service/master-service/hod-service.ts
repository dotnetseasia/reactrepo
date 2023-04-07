import { http } from "../http-common";
class HODservices {
    getHod = async (hod:any): Promise<any> => {
        return await http.post<any>("/v1/Master/HeadOfDepartment/GetAll", hod);
    };
    getHodById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/ManagerName/GetByDepartmentId?id=${id}`);
    };
   
    updateHod = async (desig: any): Promise<any> => {
        return await http.put<any>("/v1/Master/HeadOfDepartment/Update", desig);
    };
 
    getDepartmentById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Department/SearchbyId?id=${id}`);
    };

    
    getDropdownData = async (id : any): Promise<any> => {
        return await http.post<any>(`/UserManagement/GetResourcesbyDepartmentId?departmentId=${id}`);
    };
    
    getSearch = async (hod : any): Promise<any> => {
        return await http.post<any>("/v1/Master/HeadOfDepartment/GetAll", hod);
    }; 

}

export const hodServices = new HODservices();