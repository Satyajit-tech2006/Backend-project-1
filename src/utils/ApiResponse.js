class ApiResponse{
    constructor(statuscode,message='Success', success=true) {
        this.statusCode = statuscode; // HTTP status code (e.g., 200, 404, 500)
        this.message = message; // Default message is 'Success'
        this.success = statuscode<400; // true for 2xx and 3xx, false for 4xx and 5xx
        this.data = data; // Data to be returned in the response, can be any type (object, array, etc.)
    }
}
export default ApiResponse;