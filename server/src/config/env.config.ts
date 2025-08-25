import { config } from "dotenv";

const nodeEnv = process.env.NODE_ENV;
config({
    path: `.env.${nodeEnv}`
});

export const Env = {
    Mode: nodeEnv,
    Port: Number(process.env.SERVER_PORT),
    SessionSecret: String(process.env.SESSION_SECRET),
    Client: String(process.env.CLIENT_URL),
    Database: {
        Host: String(process.env.DATABASE_HOST),
        Port: Number(process.env.DATABASE_PORT),
        Username: String(process.env.DATABASE_USERNAME),
        Password: String(process.env.DATABASE_PASSWORD),
        Name: String(process.env.DATABASE_NAME)
    }
};