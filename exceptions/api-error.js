class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static Unauthorized(message = "Пользователь не авторизован") {
        return new ApiError(401, message)
    }

    static NotFound(message) {
        return new ApiError(404, message);
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

}

export default ApiError;