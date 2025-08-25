import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import AuthRoute from "./auth.router.js";
import { StandardResponse } from "../utils/response.utils.js";

const IndexAPIRoute = Router();
const V1Route = Router();

IndexAPIRoute.use("/v1", V1Route);
IndexAPIRoute.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Hello! from SariStoreMS API route!" 
    } satisfies StandardResponse);
});

V1Route.use("/auth", AuthRoute);
V1Route.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Hello! from SariStoreMS API route!" 
    } satisfies StandardResponse);
});

export default IndexAPIRoute;