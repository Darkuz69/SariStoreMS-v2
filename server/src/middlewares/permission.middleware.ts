import { Request, NextFunction, } from "express";
import expressAsyncHandler from "express-async-handler";
import { AppResponse, StandardResponse } from "../utils/response.utils.js";
import { Model } from "sequelize";
import { OperatorAttributes } from "../models/operator.model.js";
import RolePermissionService from "../services/rolePermission.service.js";

export const CheckPermission = (resource: string, action: string) => {
    return expressAsyncHandler(async(req, res, next): Promise<void> => {
        const Req = req as Request;
        const Next = next as NextFunction

        const user = Req.user;
        if(!user) throw AppResponse.unauthorized("⛔ Authentication required!");

        const operator = user as Model<OperatorAttributes>;
        await RolePermissionService.CheckUserPermission(
            Number(operator.getDataValue("id")),
            resource, action
        );

        Next();
    });
};