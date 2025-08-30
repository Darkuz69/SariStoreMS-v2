import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config.js";

export type TransactionItemAttributes = {
    id?: number,
    transactionID: number,
    productID: number,
    quantity: number,
    totalAmount: number
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
};

interface TransactionItemCreation extends Optional<TransactionItemAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">{};

const TransactionItem = sequelize.define<Model<TransactionItemAttributes, TransactionItemCreation>>("TransactionItem", {
    transactionID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true
});

export default TransactionItem;