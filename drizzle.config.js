import { defineConfig } from "drizzle-kit";
import {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
} from "./backend/utils/config.js";

export default defineConfig({
  dialect: "postgresql",
  schema: "./backend/models/*.js",
  out: "./backend/drizzle",
  dbCredentials: {
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
  },
});
