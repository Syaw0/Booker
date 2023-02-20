import { SHA256 } from "crypto-js";
import { createConnection } from "mariadb";
import { dbInfo } from "./dbConnectors";

const seedUsers = async () => {
  const con = await createConnection(dbInfo);
  await con.query(
    `INSERT IGNORE INTO booker.users (email,password) VALUES(?,?)`,
    ["s@gmail.com", SHA256("rootroot").toString()]
  );
  await con.end();
};

export default seedUsers;
