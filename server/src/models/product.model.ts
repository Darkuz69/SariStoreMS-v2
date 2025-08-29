import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";

export type ProductAttributes = {
    id?: number,
    name: string,
    productCategoryID: number,
    unitType: string,
    costPrice: number,
    sellPrice: number,
    createdAt?: number,
    updatedAt?: Date,
    deletedAt?: Date,
};

interface ProductCreation extends Optional<ProductAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">{};

const Product = sequelize.define<Model<ProductAttributes, ProductCreation>>("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productCategoryID: {
        type: DataTypes.INTEGER,
    },
    unitType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    costPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sellPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    paranoid: true,
    timestamps: true,
});

export default Product;