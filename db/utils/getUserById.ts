import { pool } from "../../db/dbController";

const getUserById = async (userId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const result = await con.query(`
      SELECT * FROM users WHERE userId="${userId}"
    `);

    return { status: true, msg: "Found User!", data: result[0] };
  } catch (err) {
    return { status: false, msg: "Error During GetUser From Maria!" };
  } finally {
    if (con != null) {
      await con.release();
    }
  }
};

export default getUserById;
