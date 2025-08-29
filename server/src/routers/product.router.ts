import { Router, Request, Response, NextFunction } from "express";
import { CheckOperatorSession } from "../middlewares/index.middleware.js";
import { CheckPermission } from "../middlewares/permission.middleware.js";
import ProductController from "../controllers/product.controller.js";

const ProductRoute = Router();

ProductRoute.use(CheckOperatorSession);

ProductRoute.get("/", CheckPermission("inventory", "view"), (req: Request, res: Response, next: NextFunction) => {
    ProductController.GetAllProducts(req, res, next);
});

ProductRoute.post("/", CheckPermission("inventory", "create"), (req: Request, res: Response, next: NextFunction) => {
    ProductController.AddProduct(req, res, next);
});

ProductRoute.get("/:id", CheckPermission("inventory", "view"), (req: Request, res: Response, next: NextFunction) =>{
    ProductController.GetProduct(req, res, next);
});

ProductRoute.delete("/:id", CheckPermission("inventory", "delete"), (req: Request, res: Response, next: NextFunction) =>{
    ProductController.DeleteProduct(req, res, next);
});

ProductRoute.patch("/:id", CheckPermission("inventory", "update"), (req: Request, res: Response, next: NextFunction) =>{
    ProductController.UpdateProduct(req, res, next);
});


export default ProductRoute;