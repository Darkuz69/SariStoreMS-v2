import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.config.js";

export type CustomerAttributes = {
    id?: number,
    personID: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
};

interface CustomerCreation extends Optional<CustomerAttributes, "id" | "createdAt" | "updatedAt" | "deletedAt">{};

const Customer = sequelize.define<Model<CustomerAttributes, CustomerCreation>>("Customer",{
    personID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
});

export default Customer;