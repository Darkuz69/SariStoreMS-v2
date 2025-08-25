import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";

export type RoleAttributes = {
    id?: number,
    name: string
};

interface RoleCreation extends Optional<RoleAttributes, 'id'>{}

const Role = sequelize.define<Model<RoleAttributes, RoleCreation>>('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Role;