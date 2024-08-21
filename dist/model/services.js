"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const users_1 = __importDefault(require("./users"));
class Service extends sequelize_1.Model {
}
Service.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    serviceName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "No description provided",
    },
    servicePrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    serviceRating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    serviceReview: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Service",
});
Service.belongsTo(users_1.default, { foreignKey: "userId" });
exports.default = Service;
