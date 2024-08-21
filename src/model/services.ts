import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import User from "./users";
import Cleaner from "./cleaners";

class Service extends Model {
  public id!: string;
  public name!: string;
  public serviceName!: string;
  public description!: string;
  public servicePrice!: number;
  public status!: string;
  public address!: string;
  public date!: string;
  public serviceRating!: number;
  public serviceReview!: string;
}

Service.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No description provided",
    },
    servicePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    serviceRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    serviceReview: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    modelName: "Service",
  }
);

Service.belongsTo(User, { foreignKey: "userId" });

export default Service;
