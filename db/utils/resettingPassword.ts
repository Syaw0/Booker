import { pool } from "../../db/dbController";

const resettingPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(`
      UPDATE users SET password="${newPassword}" WHERE email="${email}" and password="${oldPassword}"
    `);

    return { status: true, msg: "Update Password Successfully!" };
  } catch (err) {
    return { status: false, msg: "Error During Resetting Password!" };
  }
};
export default resettingPassword;
