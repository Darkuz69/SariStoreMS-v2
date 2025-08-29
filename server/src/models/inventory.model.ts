import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";

export type InventoryAttributes = {
    id?: number,
    productID: number,
    quantity: number,
    reorderLevel: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
};

interface InventoryCreation extends Optional<InventoryAttributes, "id" | "createdAt" | "updatedAt"> {};

const Inventory = sequelize.define<Model<InventoryAttributes, InventoryCreation>>("Inventory", {
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reorderLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    paranoid: true,
    timestamps: true,
});

export default Inventory;