import { http } from "../http-common";
class DocumentListService {
    getDocument = async (): Promise<any> => {
        return await http.get<any>("/v1/Master/GetAllChannel");
    };
    getDocumentById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/GetChannelDetails?id=${id}`);
    };
    createDocument = async (document: any): Promise<any> => {
        return await http.post<any>("/v1/Master/CreateChannel", document);
    };

    updateDocument = async (document: any): Promise<any> => {
        return await http.put<any>("/v1/Master/UpdateChannel", document);
    };

    deleteDocument = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/DeleteChannel?id=${id}`);
    }
}
export const documentlistServices = new DocumentListService();