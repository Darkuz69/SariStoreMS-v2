import OperatorRole from "../models/operatorRole.model.js";
import RolePermission from "../models/rolePermission.model.js";
import Permission from "../models/permission.model.js";
import { AppResponse } from "../utils/response.utils.js";
import { DatabaseError } from "sequelize";
import Role from "../models/role.model.js";

const RolePermissionService = {
    CheckUserPermission: async(operatorID: number, resource: string, action: string) => {
        const permission = await RolePermission.findAll({
            include: [
                {
                    model: Permission,
                    where: { resource, action },
                    required: true,
                },
                {
                    model: Role,
                    include: [{
                        model: OperatorRole,
                        where: { id: operatorID },
                        required: true,
                    }],
                    required: true,
                }
            ]
        });

        if(permission.length === 0) throw AppResponse.forbidden("⛔ Access Denied!");

        return;
    },
};

export default RolePermissionService;