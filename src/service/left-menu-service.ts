import { http } from "./http-common";

class NoticeBoard{

getEvent = async (event: any): Promise<any> => {
    return await http.get<any>('/v1/NoticeBoard/GetTopTenEvent', event);
};

getNotice = async (notice: any): Promise<any> => {
    return await http.get<any>('/v1/NoticeBoard/GetTopTenNotices', notice);
};

getBirthday = async (birthday: any): Promise<any> => {
    return await http.get<any>('/v1/NoticeBoard/GetBirthdayDate', birthday);
};


}


export const noticeBoard = new NoticeBoard();