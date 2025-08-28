import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import AuthRoute from "./auth.router.js";
import { AppResponse } from "../utils/response.utils.js";

const IndexAPIRoute = Router();
const V1Route = Router();

IndexAPIRoute.use("/v1", V1Route);
IndexAPIRoute.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("Hello! from SariStoreMS API route!");
    res.status(response.statusCode).json(response);
});

V1Route.use("/auth", AuthRoute);
V1Route.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("Hello! from SariStoreMS API route!");
    res.status(response.statusCode).json(response);
});

export default IndexAPIRoute;