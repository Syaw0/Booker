import { pool } from "../../db/dbController";

const getAddressById = async (addressId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const list = await con.query(`
    SELECT * FROM addresses WHERE addressId="${addressId}"
      `);
    if (list.length == 0) {
      return { status: false, msg: "nothing here!" };
    }
    return { status: true, msg: "OK", data: list[0] };
  } catch (err) {
    return { status: false, msg: "Error During Get Addresses" };
  }
};

export default getAddressById;
