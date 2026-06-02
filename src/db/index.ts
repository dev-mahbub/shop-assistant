import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  connectionString: config.connecting_string,
});

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(20) NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'shopowener',
        is_active BOOLEAN DEFAULT false,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

    await pool.query(`
          CREATE TABLE IF NOT EXISTS subscriptions(
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          payment_status VARCHAR(20) DEFAULT 'unpaid',
          plan VARCHAR(20) DEFAULT 'basic' NOT NULL,
          price DECIMAL(10,2) DEFAULT 15 NOT NULL,
          status VARCHAR(20) DEFAULT 'inactive',
          started_at TIMESTAMP DEFAULT NOW(),
          expire_at TIMESTAMP,
          payment_method VARCHAR(20),

          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()

          )
          `);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default initDB;
