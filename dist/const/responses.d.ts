export declare class Responses {
    private status_code;
    private message;
    result: any;
    is_success: boolean;
    constructor(status_code: number, result: any, message: string, is_success: boolean);
    static sendResponse(statusCode: number, result: any, message: string, isSuccess: boolean): {
        statusCode: number;
        result: any;
        message: string;
        isSuccess: boolean;
    };
}
