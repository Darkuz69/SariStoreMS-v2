import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";
import { AppResponse } from "../utils/response.utils.js";
import expressAsyncHandler from "express-async-handler";
import sequelize from "../config/database.config.js";

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

        const products = await Product.findAll();
        if(products.length === 0) throw AppResponse.badRequest("⛔ No products yet!");

        const response = AppResponse.ok("✅ Products found!", products);
        _res.status(response.statusCode).json(response);
    }),
    GetProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);

        const productID = _req.params.id;
        if(!productID) throw AppResponse.badRequest("⛔ Must provide Product ID!");

        const product = await Product.findByPk(productID);
        if(!product) throw AppResponse.notFound("⛔ Such product doesn't exist!");

        const response = AppResponse.ok("✅ Product found!", product);
        _res.status(response.statusCode).json(response);
    }),
    AddProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);
        
        const { payload } = _req.body;
        if(!payload) throw AppResponse.badRequest("⛔ Must provide request payload!");

        try {
            const result = await sequelize.transaction(async t => {
                const checkProduct = await Product.findOne({
                    where: {
                        name: payload.name,
                        productCategoryID: Number(payload.productCategoryID),
                    }
                });

                if(checkProduct) return AppResponse.badRequest("⛔ Product already exists!");

                const newProduct = await Product.create({ 
                    name: payload.name,
                    productCategoryID: Number(payload.productCategoryID),
                    unitType: payload.unitType,
                    costPrice: Number(payload.costPrice),
                    sellPrice: Number(payload.sellPrice),
                }, {
                    transaction: t
                });

                const newInventory = await Inventory.findOrCreate({
                    where: { productID: newProduct.getDataValue("id") },
                    defaults: {
                        productID: Number(newProduct.getDataValue("id")),
                        quantity: Number(payload.quantity),
                        reorderLevel: Number(payload.reorderLevel)
                    },
                    transaction: t
                });

                return AppResponse.created("✅ New product recorded!", newProduct);
            });

            if(result.statusCode < 300) throw result;
            _res.status(result.statusCode).json(result);
        } catch(error) {
            _next(error);
        }
    }),
    DeleteProduct: expressAsyncHandler(async(req, res, next) => {
        const { _req, _res, _next } = ConvertWithType(req, res, next);
        
        const productID = _req.params.id;
        if(!productID) throw AppResponse.badRequest("⛔ Must provide Product ID!");
        
        try {
            const result = await sequelize.transaction(async t => {
                const product = await Product.findByPk(productID, {
                    transaction: t
                });
                if(!product) return AppResponse.notFound("⛔ Such product doesn't exist!");

                await product.destroy({
                    transaction: t
                });

                return AppResponse.ok("✅ Product deleted");
            });
            
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
        
        const productID = _req.params.id;
        if(!productID) throw AppResponse.badRequest("⛔ Must provide Product ID!");

        try {
            const result = await sequelize.transaction(async t => {
                const product = await Product.findByPk(productID);
                if(!product) return AppResponse.notFound("⛔ Such product doesn't exist!");

                const inventory = await Inventory.findOne({
                    where: { productID: productID }
                });

                await product.update({
                    name: payload.name ?? product.getDataValue("name"),
                    productCategoryID: payload.productCategoryID ?? product.getDataValue("productCategoryID"),
                    unitType: payload.unitType ?? product.getDataValue("unitType"),
                    costPrice: payload.costPrice ?? product.getDataValue("costPrice"),
                    sellPrice: payload.sellPrice ?? product.getDataValue("sellPrice"),
                });

                await inventory?.update({
                    quantity: payload.quantity ?? inventory.getDataValue("quantity"),
                    reorderLevel: payload.reorderLevel ?? inventory.getDataValue("reorderLevel")
                });

                return AppResponse.ok("✅ Product updated!");
            });

            if(result.statusCode < 300) throw result;
            _res.status(result.statusCode).json(result);
        } catch(error) {
            _next(error);
        }
    }),
};

export default ProductController;