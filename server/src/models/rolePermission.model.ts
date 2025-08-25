import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";
import Role from "./role.model.js";
import Permission from "./permission.model.js";

export type RolePermissionAttributes = {
    roleID: number,
    permissionID: number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
};

const RolePermission = sequelize.define<Model<RolePermissionAttributes>>("RolePermission", {
    roleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id"
        },
    },
    permissionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Permission,
            key: "id"
        },
    }
}, {
    paranoid: true,
    timestamps: true
});

export default RolePermission;