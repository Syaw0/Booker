import { createPool } from "mariadb";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const MARIADB_PASSWORD = process.env.MARIADB_PASSWORD;
const MARIADB_USER = process.env.MARIADB_USER;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const pool = createPool({
  port: 3030,
  host: "localhost",
  user: MARIADB_USER,
  password: MARIADB_PASSWORD,
  database: "booker",
  // connectionLimit: 100,
});

const redisClient = createClient({
  socket: {
    port: 3232,
    host: "localhost",
  },
  password: REDIS_PASSWORD,
});

export { pool, redisClient };
