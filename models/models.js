import { DataTypes } from "sequelize";
import sequelize from "./db.js";

export const Token = sequelize.define("token", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  occupiedPlaces: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: [],
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
    allowNull: false
  },
});

User.hasOne(Token, { onDelete: "cascade" });
Token.belongsTo(User);

export const Repertoire = sequelize.define("repertoire", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export const Session = sequelize.define("session", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  occupiedPlaces: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: [],
  },
});

Repertoire.hasMany(Session);
Session.belongsTo(Repertoire);
