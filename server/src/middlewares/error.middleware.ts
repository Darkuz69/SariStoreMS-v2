import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    statusCode: number;
    success: boolean;
    errors?: Record<string, any>;

    constructor(message: string, statusCode = 500, errors?: Record<string, any>) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.success = false;
        if(errors) this.errors = errors;

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

export const GlobalErrorHandler = (err: AppError | Error, _req: Request, res: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: null,
            errors: err.errors
        });
    } else {
        res.status(500).json({
            success: false,
            message: err.message || "🚫 Internal Server Error!",
            data: null,
            errors: null
        });
    }
};