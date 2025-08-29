import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";
import { GenerateOperatorCode } from "../utils/operator.utils.js";

export type OperatorAttributes = {
    id?: number,
    personID?: number,
    operatorCode?: string,
    passwordHash: string,
    salt?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
};

export interface OperatorCreation extends Optional<OperatorAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>{};

const Operator = sequelize.define<Model<OperatorAttributes, OperatorCreation>>('Operator', {
    personID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operatorCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => GenerateOperatorCode(),
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    paranoid: true,
    timestamps: true,
});

export default Operator;