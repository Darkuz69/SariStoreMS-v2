import { Sequelize, Error, Op, Model } from "sequelize";

export const ResolveInitialSequelizeError = (error: any) => {
    if(error instanceof Error) {
        console.log(`🚫 There was an error on interacting with the database: ${error.message}`);
        console.log(`📚 Stack Trace: ${error.stack}`)
    } else console.log(`🚫 Something went wrong: ${error}`);
};

export const CloseConnectionAndExit = (sequelize: Sequelize) => {
    sequelize.close();
    process.exit(1);
};

import Inventory from "../models/inventory.model.js";
import Operator from "../models/operator.model.js";
import Permission, { PermissionAttributes } from "../models/permission.model.js";
import Person from "../models/person.model.js";
import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import Role, { RoleAttributes } from "../models/role.model.js";

import OperatorRole from "../models/operatorRole.model.js";
import RolePermission from "../models/rolePermission.model.js";

export const SyncModels = async() => {
    try {
        // Models with no FK
        await Permission.sync({ alter: true });
        await Person.sync({ alter: true });
        await ProductCategory.sync({ alter: true });
        await Role.sync({ alter: true });

        // Models with FK
        await Operator.sync({ alter: true });
        await Product.sync({ alter: true });
        await Inventory.sync({ alter: true });
        
        // Junction Models
        await OperatorRole.sync({ alter: true });
        await RolePermission.sync({ alter: true });
    } catch(error) {
        ResolveInitialSequelizeError(error);
    }
};

export const DefineAssociations = () => {
    try {
        // 1:1 Person => Operator
        Person.hasOne(Operator, {
            foreignKey: "personID"
        });
        Operator.belongsTo(Person, {
            foreignKey: "personID"
        });

        // 1:M ProductCategory => Product
        ProductCategory.hasMany(Product, {
            foreignKey: "productCategoryID"
        });
        Product.belongsTo(ProductCategory, {
            foreignKey: "productCategoryID"
        });

        // 1:1 Product => Inventory
        Product.hasOne(Inventory, {
            foreignKey: "productID",
        });
        Inventory.belongsTo(Product, {
            foreignKey: "productID",
        });

        // 1:M through M:M Operator => Role
        Operator.belongsToMany(Role, {
            through: OperatorRole,
            foreignKey: "operatorID",
            otherKey: "roleID"
        });
        Role.belongsToMany(Operator, {
            through: OperatorRole,
            foreignKey: "roleID",
            otherKey: "operatorID"
        });

        // 1:M through M:M Role => Permission
        Role.belongsToMany(Permission, {
            through: RolePermission,
            foreignKey: "roleID",
            otherKey: "permissionID"
        });
        Permission.belongsToMany(Role, {
            through: RolePermission,
            foreignKey: "permissionID",
            otherKey: "roleID"
        });

        // Junction table connect
        OperatorRole.belongsTo(Operator, {
            foreignKey: "operatorID",
        });
        OperatorRole.belongsTo(Role, {
            foreignKey: "roleID",
        });

        RolePermission.belongsTo(Role, {
            foreignKey: "roleID",
        });
        RolePermission.belongsTo(Permission, {
            foreignKey: "permissionID",
        });
    } catch(error) {
        ResolveInitialSequelizeError(error);
    }
};

const rolesData = [
    { name: "admin" },
    { name: "operator" },
    { name: "staff" }
];

const permissionsData = [
    // user
    { resource: "user", action: "create_operator" },
    { resource: "user", action: "create_staff" },
    { resource: "user", action: "update_any" },
    { resource: "user", action: "delete_any" },
    { resource: "user", action: "update_staff" },
    { resource: "user", action: "delete_staff" },

    // customer
    { resource: "customer", action: "create" },
    { resource: "customer", action: "update" },
    { resource: "customer", action: "delete" },
    { resource: "customer", action: "view" },

    // inventory
    { resource: "inventory", action: "create" },
    { resource: "inventory", action: "update" },
    { resource: "inventory", action: "delete" },
    { resource: "inventory", action: "view" },

    // transaction
    { resource: "transaction", action: "create" },
    { resource: "transaction", action: "update" },
    { resource: "transaction", action: "delete" },
    { resource: "transaction", action: "view" },

    // utang
    { resource: "utang", action: "create_record" },
    { resource: "utang", action: "update_record" },
    { resource: "utang", action: "delete_record" },
    { resource: "utang", action: "view_record" },

    // report
    { resource: "report", action: "generate" },
    { resource: "report", action: "view" },

    // expense
    { resource: "expense", action: "record" },
    { resource: "expense", action: "update" },
    { resource: "expense", action: "delete" },
    { resource: "expense", action: "view" },

    // settings
    { resource: "settings", action: "update" }
];

const rolePermissions = {
    admin: [
        "user_create_operator",
        "user_create_staff",
        "user_update_any",
        "user_delete_any",
        "customer_create",
        "customer_update",
        "customer_delete",
        "customer_view",
        "inventory_create",
        "inventory_update",
        "inventory_delete",
        "inventory_view",
        "transaction_create",
        "transaction_update",
        "transaction_delete",
        "transaction_view",
        "utang_create_record",
        "utang_update_record",
        "utang_delete_record",
        "utang_view_record",
        "report_generate",
        "report_view",
        "expense_record",
        "expense_update",
        "expense_delete",
        "expense_view",
        "settings_update"
    ],
    operator: [
        "user_create_staff",
        "user_update_staff",
        "user_delete_staff",
        "customer_create",
        "customer_update",
        "customer_delete",
        "customer_view",
        "inventory_create",
        "inventory_update",
        "inventory_delete",
        "inventory_view",
        "transaction_create",
        "transaction_update",
        "transaction_delete",
        "transaction_view",
        "utang_create_record",
        "utang_update_record",
        "utang_delete_record",
        "utang_view_record",
        "report_generate",
        "report_view",
        "expense_record",
        "expense_update",
        "expense_delete",
        "expense_view"
    ],
    staff: [
        "customer_create",
        "customer_update",
        "customer_view",
        "inventory_view",
        "transaction_create",
        "transaction_update",
        "transaction_view",
        "utang_create_record",
        "utang_update_record",
        "utang_view_record",
        "expense_record",
        "expense_view"
    ]
};

export const SeedRolesAndPermissions = async() => {
    try {
        console.log("🌱 Seeding roles and permissions...");

        const roleRecords: Record<string, Model<RoleAttributes>> = {};
        for(let role of rolesData) {
            const newRole = await Role.findOrCreate({ where: { name: role.name } });
            roleRecords[role.name] = newRole[0];
        }

        const permissionRecords: Record<string, Model<PermissionAttributes>> = {};
        for(let permission of permissionsData) {
            const newPermission = await Permission.findOrCreate({ where: { resource: permission.resource, action: permission.action } });
            permissionRecords[`${permission.resource}_${permission.action}`] = newPermission[0];
        }

        for(let [role, permission] of Object.entries(rolePermissions)) {
            for(let key of permission) {
                await RolePermission.findOrCreate({
                    where: {
                        roleID: roleRecords[role]?.getDataValue("id"),
                        permissionID: permissionRecords[key]?.getDataValue("id")
                    }
                });
            }
        }

        console.log("🪴  Roles and permissions seeded successfully!")
    } catch(error) {
        ResolveInitialSequelizeError(error);
    }
}

const productCategories = [
    "Foods & Snacks", 
    "Beverages", 
    "Rice & Cooking Essentials", 
    "Household Items", 
    "Personal Care & Hygiene", 
    "Mobile & Miscellaneous"
];

export const SeedProductCategories = async() => {
    console.log("🌱 Seeding product categories...");
    
    try {
        for(let category of productCategories) {
            await ProductCategory.findOrCreate({ 
                where: { name: category }
            });
        }
        
        console.log("🪴  Product categories seeded successfully!")
    } catch(error) {
        ResolveInitialSequelizeError(error);
    }
};