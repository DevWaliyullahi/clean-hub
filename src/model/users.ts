import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";


class User extends Model {
  public id!: string;
  public fullname!: string;
  public photo!: Buffer;
  public email!: string;
  public password!: string;
  public gender!: string;
  public phonenumber!: string;
  public address!: string;
  public dateofbirth!: string;
  public occupation!: string;
  public isAdmin!: boolean;
}


User.init(
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
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
    dateofbirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;