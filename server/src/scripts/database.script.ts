import { Sequelize, QueryTypes } from "sequelize";
import { fileURLToPath } from 'url';
import { BaseConfig } from "../config/database.config.js"
import { Env } from "../config/env.config.js";
import { CloseConnectionAndExit, DefineAssociations, ResolveInitialSequelizeError, SeedRolesAndPermissions, SyncModels } from "../utils/database.utils.js";
import { BootstrapAdmin } from "../utils/operator.utils.js";

const __filename = fileURLToPath(import.meta.url);
const sequelize = new Sequelize(BaseConfig);

const isMainModule = process.argv[1] === __filename || 
                     process.argv[1] === __filename.replace('.ts', '.js');

const isSetAdmin = process.argv[2] === "--setAdmin";

export const InitializeDatabase = async () => {
    try {
        console.log("🔗 Testing database connection...");
        await sequelize.authenticate();
        console.log("✅ Database connection established!");

        console.log("🔍 Checking if database exist...");
        const [results, _metadata] = await sequelize.query("SELECT 1 FROM pg_database WHERE datname = :database", {
            replacements: { database: Env.Database.Name },
            type: QueryTypes.SELECT
        });

        if(!results) {
            console.log("🚫 Database not found!");
            console.log("🔨 Creating database...");
            
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(Env.Database.Name)) throw new Error('Invalid database name format');
            await sequelize.query(`CREATE DATABASE ${Env.Database.Name}`);
            console.log("👍 Database created succesfully!");
        } else {
            console.log("✅ Database found. Proceeding to next task...");
        }
        
        console.log("🔄️ Initializing model associations...");
        DefineAssociations();
        console.log("✅ Model association initialized!");

        console.log("🔗 Syncing database models...");
        await SyncModels();
        await sequelize.sync({ alter: true });
        console.log("✅ Database models synced. Proceeding to next task...");

        await SeedRolesAndPermissions();

        await BootstrapAdmin({
            firstName: "John",
            lastName: "Doe",
            birthDate: new Date("2024-04-02")
        }, {
            passwordHash: "Admin12345",
        });
    } catch(error) {
        ResolveInitialSequelizeError(error);
    }
};

if(isMainModule) await InitializeDatabase().then(() => CloseConnectionAndExit(sequelize));