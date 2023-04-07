import { http } from "../http-common";

class ForgotPasswordService {
    verifyUser_and_generate_otp = async (data: any): Promise<any> => {
        return await http.post<any>("/UserManagement/SendOTPForForgotPassword", data);
    };
    verifyOTP = async (data: any): Promise<any> => {
        return await http.post<any>("/UserManagement/VerifyOTPForForgotPassword", data);
    };
    resedOTP = async (data: any): Promise<any> => {
        return await http.post<any>("/UserManagement/ResendOTPForForgotPassword", data);
    };
    resetPassword = async (data: any): Promise<any> => {
        return await http.post<any>("/UserManagement/ResetPassword", data);
    };
}
export const forgotPasswordService = new ForgotPasswordService();
class RecoverUsernameService {
    recoverUsername = async (data: any): Promise<any> => {
        return await http.post<any>("/UserManagement/SendOTPForRecoverUsername", data);
    };
    verifyUserRecoverOTP = async (data: any): Promise<any> => {
        return await http.post<any>("/UserManagement/VerifyUserRecoverOTP", data);
    };
}
export const recoverUsernameService = new RecoverUsernameService();