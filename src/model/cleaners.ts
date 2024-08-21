import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import User from "./users";
import Service from "./services";

class Cleaner extends Model {
  public id!: string;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public gender!: string;
  public phonenumber!: string;
  public address!: string;
  public nationalId!: Buffer;
  public guarantorName!: string;
  public guarantorAddress!: string;
  public guarantorPhoneNumber!: string;
  public nextOfKinName!: string;
  public nextOfKinPhoneNumber!: string;
}

Cleaner.init(
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalId: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    guarantorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guarantorAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guarantorPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nextOfKinPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cleaner",
  }
);

// Cleaner.hasOne(User, { foreignKey: "cleanerId" });
Cleaner.hasMany(Service, { foreignKey: "cleanerId" });

export default Cleaner;