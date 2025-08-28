import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { AppResponse, StandardResponse } from "../utils/response.utils.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const AuthRoute = Router();

AuthRoute.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("Hello! from SariStoreMS API Auth route!");
    res.status(response.statusCode).json(response);
});

AuthRoute.post("/operatorCode", AuthMiddleware.OperatorCode, (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("✅ Operator Code is valid!");
    res.status(response.statusCode).json(response);
});

AuthRoute.post("/password", AuthMiddleware.Password, (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("✅ Password is valid!");
    res.status(response.statusCode).json(response);
});

AuthRoute.post("/", AuthMiddleware.InputSchema, (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("✅ Given credentials is valid!");
    res.status(response.statusCode).json(response);
});

AuthRoute.post("/login", AuthMiddleware.InputSchema, (_req: Request, res: Response, _next: NextFunction) => {

});

export default AuthRoute;