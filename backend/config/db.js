import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectDB = async () => {
  try {
    const pool = new Pool({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });

    const db = drizzle(pool);
    
    console.log(`PostgreSQL connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);    
    process.exit(1);
  }
}

export default connectDB
