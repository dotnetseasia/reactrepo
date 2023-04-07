import { Observable } from 'redux';
import {Department, IDepartmentList} from '../../Interfaces/IDepartment';
import { commonServive } from './service';
export class clsDepartmentList implements IDepartmentList {
    departments: Department[] = [];
    constructor() {
    }
    public static async getDepartmentDropdownList() {
        var departmentFirstIndex = { id: "", name: "Select Departments" };
        let data:Array<any>=await this.getDepartmentsData() 
        let returnData:Array<any>=[];
        if(data.length>0){
            let arr=[departmentFirstIndex];
            returnData=arr.concat(data); 
        }
        else{
            returnData.push(departmentFirstIndex);
        }
      
        return returnData;
    }
    public static async getDepartmentsData(){
        try {
            let prm = { module: 1, status: "active" };
            var response = await commonServive.getDropdownData(prm); 
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