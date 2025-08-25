import passport from "passport";
import { Model } from "sequelize";
import { Strategy, IStrategyOptions, VerifyFunction } from "passport-local";
import Operator, { OperatorAttributes, OperatorCreation } from "../models/operator.model.js";
import { VerifyPassword } from "../utils/operator.utils.js";

const StrategyOptions: IStrategyOptions = {
    usernameField: "operatorCode",
    passwordField: "password"
};

const MainStrategy: VerifyFunction = async(operatorCode: string, password: string, done: Function) => {
    try {
        const user = await Operator.findOne({
            where: { operatorCode: operatorCode }
        });

        if(!user) {
            done(null, false);
            return;
        }

        if(!VerifyPassword(password, user.getDataValue("passwordHash"), user.getDataValue("salt"))) {
            done(null, false);
            return;
        }

        done(null, user);
    } catch(error) {
        done(error, false);
    }
};

const LocalStrategy = new Strategy(StrategyOptions, MainStrategy);
passport.use(LocalStrategy);

passport.serializeUser((user: any, done: Function) => {
    const operator = user as Model<OperatorAttributes>;

    done(null, {
        id: operator?.getDataValue("id"),
        operatorCode: operator?.getDataValue("operatorCode")
    });
});

passport.deserializeUser(async(serializedUser: { id: number, operatorCode: string }, done: Function) => {
    try {
        const user = await Operator.findByPk(serializedUser.id);

        done(null, user);
    } catch(error) {
        done(error, false);
    }
});