import { pool } from "../../db/dbController";

const checkEmailExistence = async (email: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const isExist = await con.query(
      `SELECT * FROM users WHERE email="${email}"`
    );
    if (isExist.length == 0) {
      return { status: false, msg: "Can Not Found This Email!" };
    }
    return { status: true, msg: "Found Email!", data: isExist[0] };
  } catch (err) {
    return {
      status: false,
      msg: "Error During Check Email Existence!",
      isError: true,
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default checkEmailExistence;
