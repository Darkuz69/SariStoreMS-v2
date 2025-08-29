import OperatorRole from "../models/operatorRole.model.js";
import RolePermission from "../models/rolePermission.model.js";
import Permission from "../models/permission.model.js";
import { AppResponse } from "../utils/response.utils.js";
import { DatabaseError } from "sequelize";
import Role from "../models/role.model.js";

const RolePermissionService = {
    CheckUserPermission: async(operatorID: number, resource: string, action: string) => {
        const roles = await OperatorRole.findAll({
            where: { operatorID },
        });

        if(roles.length === 0) throw AppResponse.forbidden("⛔ Access denied!");

        const roleIDs = roles.map(role => role.getDataValue("roleID"));

        const permission = await RolePermission.findAll({
            where: { roleID: roleIDs },
            include: [
                {
                    model: Permission,
                    where: { resource, action },
                    required: true,
                },
            ]
        });

        if(permission.length === 0) throw AppResponse.forbidden("⛔ Access Denied!");

        return;
    },
};

export default RolePermissionService;