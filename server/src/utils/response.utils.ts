export type StandardResponse = {
    statusCode: number,
    success: boolean,
    message: string,
    data?: {} | [] | null,
    errors?: {} | [] | null
};

export class AppResponse extends Error implements StandardResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data?: {} | [] | null;
    errors?: {} | [] | null;

    constructor(
        statusCode: number,
        message: string,
        data?: {} | [] | null,
        errors?: {} | [] | null
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name;
        
        this.statusCode = statusCode;
        this.success = statusCode >= 200 && statusCode < 300;
        this.message = message;
        this.data = data;
        this.errors = errors;

        if(statusCode >= 400 && Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static ok(message: string, data?: {} | [] | null): AppResponse {
        return new AppResponse(200, message, data);
    }

    static created(message: string, data?: {} | [] | null): AppResponse {
        return new AppResponse(201, message, data);
    }

    static noContent(message: string = "No content"): AppResponse {
        return new AppResponse(204, message);
    }

    // Error factory methods
    static badRequest(message: string, errors?: {} | [] | null): AppResponse {
        return new AppResponse(400, message, null, errors);
    }

    static unauthorized(message: string = "Unauthorized"): AppResponse {
        return new AppResponse(401, message);
    }

    static forbidden(message: string = "Forbidden"): AppResponse {
        return new AppResponse(403, message);
    }

    static notFound(message: string = "Not found"): AppResponse {
        return new AppResponse(404, message);
    }

    static serverError(message: string = "Internal server error", errors?: {} | [] | null): AppResponse {
        return new AppResponse(500, message, null, errors);
    }

    // Generic factory
    static create(statusCode: number, message: string, data?: {} | [] | null, errors?: {} | [] | null): AppResponse {
        return new AppResponse(statusCode, message, data, errors);
    }

    toJSON(): StandardResponse {
        return {
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            ...(this.data !== undefined && { data: this.data }),
            ...(this.errors !== undefined && { errors: this.errors })
        };
    }
};