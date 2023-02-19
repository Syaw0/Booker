import { pool } from "../../db/dbController";

const getAddresses = async (userId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const list = await con.query(`
    SELECT * FROM addresses WHERE userId="${userId}"
      `);
    if (list.length == 0) {
      return { status: false, msg: "nothing here!" };
    }
    return { status: true, msg: "OK", data: list.slice(0, list.length) };
  } catch (err) {
    return { status: false, msg: "Error During Get Addresses" };
  }
};

export default getAddresses;
