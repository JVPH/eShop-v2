import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } from '../utils/config';

const pool = new Pool({
      host: PG_HOST,
      port: PG_PORT,
      user: PG_USER,
      password: PG_PASSWORD,
      database: PG_DATABASE,
});

export const db = drizzle(pool);
