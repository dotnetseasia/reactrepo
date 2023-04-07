import { Observable } from "redux";
import { commonServive } from "./service";
export class clsResourcesList {
  resourceId: string = "";
  constructor() {}
  public static async getResourcesDropdownList(id: string) {
    var resourceFirstIndex = {
      userId: "",
      userName: "Select Resources",
    };
    let data: Array<any> = await this.getResourceData(id);
    let returnData: Array<any> = [];
    if (data.length > 0) {
      let sortedData = data.sort((a: any, b: any) =>
      a.userName.toUpperCase() < b.userName.toUpperCase() ? -1 : 1
    );
      let arr = [resourceFirstIndex];
      returnData = arr.concat(sortedData);
    } else {
      returnData.push(resourceFirstIndex);
    }
    return returnData;
  }
  public static async getResourceData(id: string) {
    try {
      var response = await commonServive.getResourcesByDepartment(id);
      if (response.data.isError) {
        return [];
      } else {
        return response.data;
      }
    } catch (ex: any) {
      console.error("ex:", ex);
    }
  }
}
