import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";
import Operator from "./operator.model.js";
import Role from "./role.model.js";

export type OperatorRoleAttributes = {
    operatorID: number,
    roleID: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
};

const OperatorRole = sequelize.define<Model<OperatorRoleAttributes>>("OperatorRole", {
    operatorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Operator,
            key: "id"
        },
    },
    roleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id",
        },
    },
}, {
    paranoid: true,
    timestamps: true,
});

export default OperatorRole;