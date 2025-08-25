import crypto from "crypto";

export const GeneratePasswordHash = (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex');

    return { passwordHash, salt };
};

export const VerifyPassword = (password: string, passwordHash: string, salt: string) => {
    const hashed = crypto.scryptSync(password, salt, 64).toString('hex');
    return hashed === passwordHash;
};

export const GenerateOperatorCode = () => {
    const LENGTH = 4;

    return "OP-" + crypto.randomBytes(LENGTH).toString('hex').toUpperCase();
};

import Person, { PersonAttributes } from "../models/person.model.js";
import Operator, { OperatorAttributes } from "../models/operator.model.js";
import OperatorRole from "../models/operatorRole.model.js";
import { ResolveInitialSequelizeError } from "./database.utils.js";

export const BootstrapAdmin = async(personInfo: PersonAttributes, operatorInfo: OperatorAttributes) => {
    try {
        console.log("🔨 Creating an admin account...");
        const adminAccount = await OperatorRole.findOne({ where: { roleID: 1 } });
        if(adminAccount) {
            console.log("🔍 Admin account already created!");
            return;
        }

        const newPerson = await Person.findOrCreate({ where: personInfo });

        const { passwordHash, salt } = GeneratePasswordHash(operatorInfo.passwordHash);

        const newOperator = await Operator.findOrCreate({ where: {
                personID: Number(newPerson[0].getDataValue("id")),
                passwordHash: passwordHash,
                salt: salt
            }
        });

        await OperatorRole.findOrCreate({ where: { operatorID: Number(newOperator[0].getDataValue("id")), roleID: 1 } });
        console.log("👍 Admin account created!");
    } catch(error) {
        ResolveInitialSequelizeError(error);
    }
}
