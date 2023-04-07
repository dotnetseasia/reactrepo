import { http } from "../http-common";
class ChannelService {
    getChannel = async (channel: any): Promise<any> => {
        return await http.post<any>("/v1/Master/GetAllChannel", channel);
    };
    
    getChannelById = async (id: any): Promise<any> => {
        return await http.get<any>(`/v1/Master/GetChannelDetailsById?id=${id}`);
    };

    // /api/v1/Project/GetAssignResource




    createChannel = async (channel: any): Promise<any> => {
        return await http.post<any>("/v1/Master/CreateChannel", channel);
    };

    updateChannel = async (channel: any): Promise<any> => {
        return await http.put<any>("/v1/Master/UpdateChannel", channel);
    };

    deleteChannel = async (id: any): Promise<any> => {
        return await http.delete<any>(`/v1/Master/DeleteChannel?id=${id}`);
    }

    getDropdownData = async (channel : any): Promise<any> => {
        return await http.put<any>("/v1/Master/Channel/ChangeStatus", channel);
    };

    getSearch = async (userse : any): Promise<any> => {
        return await http.post<any>("/v1/Master/GetAllChannel", userse);
    }; 

}
export const channelServices = new ChannelService();