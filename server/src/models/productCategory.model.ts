import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";

export type ProductCategoryAttributes = {
    id?: number,
    name: string
};

interface ProductCategoryCreation extends Optional<ProductCategoryAttributes, 'id'>{}

const ProductCategory = sequelize.define<Model<ProductCategoryAttributes, ProductCategoryCreation>>('ProductCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default ProductCategory;