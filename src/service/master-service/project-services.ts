import { http } from "../http-common";
class ProjectService {
    getProject = async (): Promise<any> => {
        return await http.get<any>("/v1/Master/Department/Search");
    };
    getProjectById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/Department/SearchbyId?id=${id}`);
    };
    createProject = async (project: any): Promise<any> => {
        return await http.post<any>("/v1/Master/Department/Add", project);
    };

    updateProject = async (project: any): Promise<any> => {
        return await http.put<any>("/v1/Master/Department/Edit", project);
    };

    deleteProject = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/Department/Delete?id=${id}`);
    }
}
export const projectServices = new ProjectService();