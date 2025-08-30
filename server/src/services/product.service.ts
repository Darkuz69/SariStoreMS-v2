import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import Inventory from "../models/inventory.model.js";
import sequelize from "../config/database.config.js";
import { AppResponse } from "../utils/response.utils.js";

const queryFilter = {
    include: [{
        model: ProductCategory,
        attributes: ["name"]
    }],
    attributes: {
        exclude: ["productCategoryID", "createdAt", "updatedAt", "deletedAt"]
    }
};

const ProductService = {
    GetAll: async() => {
        return Product.findAll({
            ...queryFilter
        });
    },
    GetOne: async(id: number) => {
        return Product.findByPk(id, {
            ...queryFilter
        });
    },
    AddOne: async(payload: Record<string, any>) => {
        return await sequelize.transaction(async t => {
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

            await Inventory.findOrCreate({
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
    },
    DeleteOne: async(id: number) => {
        return await sequelize.transaction(async t => {
            const product = await Product.findByPk(id, {
                transaction: t
            });
            if(!product) return AppResponse.notFound("⛔ Such product doesn't exist!");

            await product.destroy({
                transaction: t
            });

            return AppResponse.ok("✅ Product deleted");
        });
    },
    UpdateOne: async(id: number, payload: Record<string, any>) => {
        return await sequelize.transaction(async t => {
            const product = await Product.findByPk(id);
            if(!product) return AppResponse.notFound("⛔ Such product doesn't exist!");

            const inventory = await Inventory.findOne({
                where: { productID: id }
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
    }
};

export default ProductService