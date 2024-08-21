"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const services_1 = __importDefault(require("./services"));
class Cleaner extends sequelize_1.Model {
}
Cleaner.init({
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phonenumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nationalId: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false,
    },
    guarantorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    guarantorAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    guarantorPhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nextOfKinName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nextOfKinPhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Cleaner",
});
// Cleaner.hasOne(User, { foreignKey: "cleanerId" });
Cleaner.hasMany(services_1.default, { foreignKey: "cleanerId" });
exports.default = Cleaner;
