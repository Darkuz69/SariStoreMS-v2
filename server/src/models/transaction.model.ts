import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config.js";

export type TransactionAttributes = {
    id?: number,
    customerID: number,
    operatorID: number,
    totalAmount: number,
    cashPaid: number,
    creditAmount: number,
    dueDate: Date,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
};

interface TransactionCreation extends Optional<TransactionAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">{};

const Transaction = sequelize.define<Model<TransactionAttributes, TransactionCreation>>("Transaction", {
    customerID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    operatorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    cashPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    creditAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});

export default Transaction;