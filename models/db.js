import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export default sequelize;
