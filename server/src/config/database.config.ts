import { Sequelize, Options } from "sequelize";
import { Env } from "./env.config.js";
import pg from "pg";

export const Pool = new pg.Pool({
    host: Env.Database.Host,
    port: Env.Database.Port,
    user: Env.Database.Username,
    password: Env.Database.Password,
    database: Env.Database.Name,
    min: 1,
    max: 10
});

export const BaseConfig: Options = {
    dialect: "postgres",
    host: Env.Database.Host,
    port: Env.Database.Port,
    username: Env.Database.Username,
    password: Env.Database.Password,
    logging: false
};

const MainConfig: Options = {
    ...BaseConfig,
    database: Env.Database.Name,
    pool: {
        min: 1,
        max: 10
    },
};

const sequelize = new Sequelize(MainConfig);

export default sequelize;