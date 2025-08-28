import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { log } from "console";
import { Env } from "./config/env.config.js";

const App = express();
App.use(cookieParser());
App.use(express.urlencoded({
    extended: true,
    limit: "5mb",
}));
App.use(express.json({ limit: "5mb" }));
App.use(cors({
    origin: Env.Client,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

import passport from "passport";
import session from "express-session";
import connect from "connect-pg-simple";
import { Pool } from "./config/database.config.js";

const PostgreSQLStore = connect(session);
const SessionStore = new PostgreSQLStore({
    pool: Pool,
    tableName: "Sessions",
    createTableIfMissing: true,
});
App.use(session({
    store: SessionStore,
    secret: Env.SessionSecret,
    name: "sari.sid",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        path: '/',
        maxAge: 8 * 60 * 60 * 1000,
        secure: Env.Mode === "production",
        sameSite: "lax"
    }
}));
import "./config/passport.config.js"
App.use(passport.initialize());
App.use(passport.session());

import IndexAPIRoute from "./routers/index.router.js";
import { AppResponse } from "./utils/response.utils.js";
App.use("/api", IndexAPIRoute);
App.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    const response = AppResponse.ok("Hello! from SariStoreMS!");
    res.status(response.statusCode).json(response);
});

import { GlobalErrorHandler } from "./middlewares/index.middleware.js";
App.use(GlobalErrorHandler);


import { InitializeDatabase } from "./scripts/database.script.js";
import { CloseConnectionAndExit, ResolveInitialSequelizeError } from "./utils/database.utils.js";
import sequelize from "./config/database.config.js";
export const StartServer = async() => {
    try {
        log("🔄 Starting server...");
        await InitializeDatabase();
        await sequelize.authenticate();

        App.listen(Env.Port, () => {
            log(`🎉 Server has started at http://localhost:${Env.Port}`);
        });
    } catch(error) {
        ResolveInitialSequelizeError(error);
        CloseConnectionAndExit(sequelize);
    }
};