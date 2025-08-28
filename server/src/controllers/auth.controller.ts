import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AppResponse } from "../utils/response.utils.js";

const AuthController = {
    Login: (req: Request, res: Response, _next: NextFunction) => {
        if(req.isAuthenticated()) {
            const response = AppResponse.ok("👍 Operator already authenticated!");
            return res.status(response.statusCode).json(response);
        }

        passport.authenticate('local', (err: any, user: any, info: any) => {
            if(err) {
                const response = AppResponse.serverError("⛔ Something went wrong", { err });
                return res.status(response.statusCode).json(response);
            }
            if(!user) return res.redirect('/');
            req.logIn(user, (err) => {
                if(err) {
                    const response = AppResponse.serverError("⛔ Something went wrong", { err });
                    return res.status(response.statusCode).json(response);
                }
                const response = AppResponse.ok("👍 Operator authenticated!");
                res.status(response.statusCode).json(response);
                // res.redirect('/home/');
            });
        })(req, res, _next);
    }
};

export default AuthController;