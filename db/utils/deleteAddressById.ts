import { pool } from "../../db/dbController";

const deleteAddressById = async (addressId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(`
      DELETE FROM addresses WHERE addressId="${addressId}"
    `);

    return { status: true, msg: "Successfully delete address." };
  } catch (err) {
    return {
      status: false,
      msg: "Error During Delete Address!",
    };
  } finally {
    if (con != null) {
      await con.release();
    }
  }
};

export default deleteAddressById;
