export class AppError extends Error{
    errorCode :any;
    statusCode : any;
    constructor (mssge :any ,statusCode:any){
        super(mssge)
        this.statusCode = statusCode
    }
    
}