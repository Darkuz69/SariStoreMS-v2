import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config.js";

export type PaymentAttributes = {
    id?: number,
    transactionID: number,
    amountPaid: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
};

interface PaymentCreation extends Optional<PaymentAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">{};

const Payment = sequelize.define<Model<PaymentAttributes, PaymentCreation>>("Payment", {
    transactionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amountPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});

export default Payment;