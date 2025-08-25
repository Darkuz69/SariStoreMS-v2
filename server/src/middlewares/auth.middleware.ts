import Z from "zod"
import { Request, Response, NextFunction } from "express";
import { StandardResponse } from "../utils/response.utils.js";

const LoginInputSchema = Z.object({
    operatorCode: Z.string()
        .trim()
        .nonempty({ error: "⚠️ Operator code is needed!" })
        .min(11, { error: "⚠️ Operator code must be 11 characters long!" })
        .max(11, { error: "⚠️ Operator code must be 11 characters long!" })
        .regex(/^OP-[A-Z0-9]{8}$/, { error: "⚠️ Operator code is not valid!" }),
    password: Z.string()
        .trim()
        .nonempty({ error: "⚠️ Password is needed!" })
        .min(8, { error: "⚠️ Password must be 8 characters minimum!" })
        .max(16, { error: "⚠️ Password must be 16 characters maximum!" })
        .regex(/[A-Z]/, { error: "⚠️ Password must contain at least one uppercase letter!" })
        .regex(/[a-z]/, { error: "⚠️ Password must contain at least one lowercase letter!" })
        .regex(/[0-9]/, { error: "⚠️ Password must contain at least one number!" })
        .regex(/[!@#$%^&*()_+={}[\]:";'<>?,./-]/, { error: "⚠️ Password must contain at least one special character!" })
});

const OperatorCodeSchema = LoginInputSchema.shape.operatorCode;
const PasswordSchema = LoginInputSchema.shape.password;

export type LoginInputAttributes = Z.infer<typeof LoginInputSchema>;

const AuthValidate = {
    OperatorCode: (operatorCode: string) => {
        const results = OperatorCodeSchema.safeParse(operatorCode);
        return {
            success: results.success,
            message: "🚫 Validation Error!",
            data: results.success ? results.data : null,
            errors: results.success ? null : results.error.issues.map((issue) => (issue.message))
        } satisfies StandardResponse;
    },
    Password: (password: string) => {
        const results = PasswordSchema.safeParse(password);
        return {
            success: results.success,
            message: "🚫 Validation Error!",
            data: results.success ? results.data : null,
            errors: results.success ? null : results.error.issues.map((issue) => (issue.message))
        } satisfies StandardResponse;
    },
    InputSchema: (operator: LoginInputAttributes) => {
        const results = LoginInputSchema.safeParse(operator);
        return {
            success: results.success,
            message: "🚫 Validation Error!",
            data: results.success ? results.data : null,
            errors: results.success ? null : results.error.issues.map((issue) => (issue.message))
        } satisfies StandardResponse;
    }
};

const AuthMiddleware = {
    OperatorCode: (req: Request, res: Response, next: NextFunction) => {
        const { operatorCode } = req.body;
        const validationResult = AuthValidate.OperatorCode(operatorCode);
        if(!validationResult.success) return res.status(400).json(validationResult);
        next();
    },
    Password: (req: Request, res: Response, next: NextFunction) => {
        const { password } = req.body;
        const validationResult = AuthValidate.Password(password);
        if(!validationResult.success) return res.status(400).json(validationResult);
        next();
    },
    InputSchema: (req: Request, res: Response, next: NextFunction) => {
        const { operatorCode, password } = req.body;
        const validationResult = AuthValidate.InputSchema({ operatorCode: operatorCode, password: password });
        if(!validationResult.success) return res.status(400).json(validationResult);
        next();
    },
};

export default AuthMiddleware;