import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const getAddresses = async (userId: string) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    const list = await con.query(`
    SELECT * FROM addresses WHERE userId="${userId}"
      `);

    return { status: true, msg: "OK", data: list.slice(0, list.length) };
  } catch (err) {
    return { status: false, msg: "Error During Get Addresses" };
  }
};

export default getAddresses;
