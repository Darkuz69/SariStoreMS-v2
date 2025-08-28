import OperatorRole from "../models/operatorRole.model.js";
import RolePermission from "../models/rolePermission.model.js";
import Permission from "../models/permission.model.js";
import { AppResponse } from "../utils/response.utils.js";
import { DatabaseError } from "sequelize";
import Role from "../models/role.model.js";

const RolePermissionService = {
    CheckUserPermission: async(operatorID: number, resource: string, action: string) => {
    },
};

export default RolePermissionService;