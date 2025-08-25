import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";

export type PermissionAttributes = {
    id?: number,
    resource: string,
    action: string
};

interface PermissionCreation extends Optional<PermissionAttributes, 'id'>{}

const Permission = sequelize.define<Model<PermissionAttributes, PermissionCreation>>('Permission', {
    resource: {
        type: DataTypes.STRING,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Permission;