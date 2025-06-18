import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseName = process.env.DATABASE_NAME as string;
const databaseUsername = process.env.DATABASE_USERNAME as string;
const databasePassword = process.env.DATABASE_PASSWORD as string;
const databaseHost = process.env.DATABASE_HOST as string;
const databasePort = parseInt(process.env.DATABASE_PORT as string, 10);

export const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  host: databaseHost,
  port: databasePort,
  dialect: "postgres",
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  timezone: "UTC",
  dialectOptions: {
    useUTC: true,
    dateStrings: true
  },
  logging: false
})

export const startDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  }
  catch (err) {
    throw new Error("Failed to connect to Database");
  }
}
