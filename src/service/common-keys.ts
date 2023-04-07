export class commonKeys{
    public baseURL:string="https://stg.appsndevs.com/seasiaconnectapi/";
    public api: string = "api/";
    public files: string= "FileUploads/";

    constructor(){
        this.api=this.baseURL+this.api;
        this.files=this.baseURL+this.files;
    }
}   