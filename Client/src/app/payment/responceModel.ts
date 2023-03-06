export class Responce {
    status_code : number;
    detail : string;

    constructor(obj:any){
        this.status_code = obj.status_code
        this.detail = obj.details
    }
}

export interface HttpResponce {
    status_code : number;
    detail : number;
}