import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../utils/response.utils.js";
import { DatabaseError, Error as SequelizeError} from "sequelize";

export const GlobalErrorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    if(error instanceof AppResponse) return res.status(error.statusCode).json(error);

    const response = (error instanceof SequelizeError) ? 
        AppResponse.serverError(error.message, error.stack) : AppResponse.serverError("⛔ Something went wrong!", error);
    
    console.error(response);
    res.status(response.statusCode).json(response);
};

export const CheckOperatorSession = (req: Request, res: Response, next: NextFunction) => {
    if(!req.isAuthenticated()) return res.redirect("/");

    next();
};