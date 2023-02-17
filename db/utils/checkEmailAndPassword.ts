import { pool } from "../dbController";

const checkEmailAndPassword = async (email: string, password: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const isEmailExist = await con.query(`
    SELECT * FROM users WHERE email="${email}"
    `);

    if (isEmailExist.length == 0) {
      return { status: false, msg: "Email Does Not Exist In DB!" };
    }

    const isPasswordSame = await con.query(`
    SELECT * FROM users WHERE email="${email}" and password="${password}"
    `);

    if (isPasswordSame.length == 0) {
      return { status: false, msg: "Password And Email Does Not Match!" };
    }

    return {
      status: true,
      msg: "Your Data Is Correct!",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "Error During Connect To DB!",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default checkEmailAndPassword;
