import sequelize from "../config/database.config.js";
import { DataTypes, Model, Optional } from "sequelize";

export type PersonAttributes = {
    id?: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    suffix?: string,
    birthDate: Date,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
};

interface PersonCreation extends Optional<PersonAttributes, 'id' | 'createdAt' | 'updatedAt'>{};

const Person = sequelize.define<Model<PersonAttributes, PersonCreation>>('Person', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    suffix: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    paranoid: true,
    timestamps: true
});

export default Person;