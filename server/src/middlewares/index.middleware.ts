import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../utils/response.utils.js";

export const GlobalErrorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    if(error instanceof AppResponse) return res.status(error.statusCode).json(error);

    const response = AppResponse.serverError("⛔ Something went wrong!", error);
    res.status(response.statusCode).json(response);
}

export const CheckOperatorSession = (req: Request, res: Response, next: NextFunction) => {
    if(!req.isAuthenticated()) res.redirect("/");

    next();
}