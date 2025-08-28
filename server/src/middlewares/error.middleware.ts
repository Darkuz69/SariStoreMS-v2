import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../utils/response.utils.js";

export const GlobalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppResponse) return res.status(error.statusCode).json(error);

    const response = AppResponse.serverError("⛔ Something went wrong!");
    res.status(response.statusCode).json(response);
}