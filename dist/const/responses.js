"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Responses = void 0;
class Responses {
    constructor(status_code, result, message, is_success) {
        this.status_code = status_code;
        this.result = result;
        this.message = message;
        this.is_success = is_success;
    }
    static sendResponse(statusCode, result, message, isSuccess) {
        return {
            statusCode,
            result,
            message,
            isSuccess,
        };
    }
}
exports.Responses = Responses;
//# sourceMappingURL=responses.js.map