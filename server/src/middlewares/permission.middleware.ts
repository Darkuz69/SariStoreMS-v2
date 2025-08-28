import { Request, Response, NextFunction, Express } from "express";
import expressAsyncHandler from "express-async-handler";
import { StandardResponse } from "../utils/response.utils.js";
import { Model } from "sequelize";
import { OperatorAttributes } from "../models/operator.model.js";
import RolePermissionService from "../services/rolePermission.service.js";

export const CheckPermission = (resource: string, action: string) => {
};