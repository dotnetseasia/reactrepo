
class APIURL{
    getImageURL = (): string => {
        let protocol=window.location.protocol;
        let securePath=process.env.REACT_APP_API_Secure_FOLDER_PATH??"";
        let Path=process.env.REACT_APP_API_FOLDER_PATH??"";
        if(protocol=="https:"){
            return securePath;
        }
        else{
            return Path;
        }
    };
    getApiURL = (): string => {
        let protocol=window.location.protocol;
        let securePath=process.env.REACT_APP_BASE_Secure_URL??"";
        let Path=process.env.REACT_APP_BASE_URL??"";
        if(protocol=="https:"){
            return securePath;
        }
        else{
            return Path;
        }
    };
    getBEURL = (): string => {
        let protocol=window.location.protocol;
        let securePath=process.env.REACT_APP_BE_Secure_URL??"";
        let Path=process.env.REACT_APP_BE_URL??"";
        if(protocol=="https:"){
            return securePath;
        }
        else{
            return Path;
        }
    };
    get_HUB_URL = (): string => {
        let protocol=window.location.protocol;
        let securePath=process.env.REACT_APP_API_Secure_Hub??"";
        let Path=process.env.REACT_APP_API_Hub??"";
        if(protocol=="https:"){
            return securePath;
        }
        else{
            return Path;
        }
    };
}
export const apiUrl = new APIURL()

