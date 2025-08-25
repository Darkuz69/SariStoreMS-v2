import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { StandardResponse } from "../utils/response.utils.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const AuthRoute = Router();

AuthRoute.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Hello! from SariStoreMS API Auth route!"
    } satisfies StandardResponse);
});

AuthRoute.post("/operatorCode", AuthMiddleware.OperatorCode, (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "✅ Operator Code is valid!"
    } satisfies StandardResponse);
});

AuthRoute.post("/password", AuthMiddleware.Password, (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "✅ Password is valid!"
    } satisfies StandardResponse);
});

AuthRoute.post("/", AuthMiddleware.InputSchema, (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "✅ Given credentials is valid!"
    } satisfies StandardResponse);
});

export default AuthRoute;