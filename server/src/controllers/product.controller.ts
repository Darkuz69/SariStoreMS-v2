import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../utils/response.utils.js";
import expressAsyncHandler from "express-async-handler";
import ProductService from "../services/product.service.js";

const ConvertWithType = (req: any, res: any, next: any) => {
    return {
        _req: req as Request,
        _res: res as Response,
        _next: next as NextFunction
    };
};

/**
 * Handles product management operations within the system
 * 
 * Provides methods for retrieving all products, fetching a single product,
 * creating new products (with inventory initialization), updating product details,
 * and deleting products. All operations integrate with Sequelize models and 
 * utilize transactions to ensure data consistency.
 * 
 * @constant ProductController
 * @version 1.0.0
 * @author Darkuz_69
 * @since 2024-08-29
 */
const ProductController = {
    GetAllProducts: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);

        const products = await ProductService.GetAll();
        if(products.length === 0) throw AppResponse.badRequest("⛔ No products yet!");

        const response = AppResponse.ok("✅ Products found!", products);
        _res.status(response.statusCode).json(response);
    }),
    GetProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);

        const productID = Number(_req.params.id);
        if(!productID) throw AppResponse.badRequest("⛔ Must provide Product ID!");

        const product = await ProductService.GetOne(productID)
        if(!product) throw AppResponse.notFound("⛔ Such product doesn't exist!");

        const response = AppResponse.ok("✅ Product found!", product);
        _res.status(response.statusCode).json(response);
    }),
    AddProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);
        
        const { payload } = _req.body;
        if(!payload) throw AppResponse.badRequest("⛔ Must provide request payload!");

        try {
            const result = await ProductService.AddOne(payload);
            if(result.statusCode < 300) throw result;
            _res.status(result.statusCode).json(result);
        } catch(error) {
            _next(error);
        }
    }),
    DeleteProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);
        
        const productID = Number(_req.params.id);
        if(!productID) throw AppResponse.badRequest("⛔ Must provide Product ID!");
        
        try {
            const result = await ProductService.DeleteOne(productID);
            if(result.statusCode < 300) throw result;
            _res.status(result.statusCode).json(result);
        } catch(error) {
            _next(error);
        }
    }),
    UpdateProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);
        
        const { payload } = _req.body;
        if(!payload) throw AppResponse.badRequest("⛔ Must provide request payload!");
        
        const productID = Number(_req.params.id);
        if(!productID) throw AppResponse.badRequest("⛔ Must provide Product ID!");

        try {
            const result = await ProductService.UpdateOne(productID, payload);
            if(result.statusCode < 300) throw result;
            _res.status(result.statusCode).json(result);
        } catch(error) {
            _next(error);
        }
    }),
};

export default ProductController;