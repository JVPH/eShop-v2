import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_DATABASE = process.env.PG_DATABASE;
const JWT_SECRET = process.env.JWT_SECRET;

export {
  PORT,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  JWT_SECRET,
};
