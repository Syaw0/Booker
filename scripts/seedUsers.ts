import { SHA256 } from "crypto-js";
import { pool } from "./dbConnectors";

const seedUsers = async () => {
  const con = await pool.getConnection();
  await con.query(`INSERT IGNORE INTO users (email,password) VALUES(?,?)`, [
    "s@gmail.com",
    SHA256("rootroot").toString(),
  ]);
};

export default seedUsers;
