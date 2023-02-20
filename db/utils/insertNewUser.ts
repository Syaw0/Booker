import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const insertNewUser = async (email: string, password: string) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    await con.query(
      `
      INSERT INTO users (email,password) VALUES(?,?)
    `,
      [email, password]
    );
    return { status: true, msg: "Successfully Created New Account!" };
  } catch (err) {
    return { status: false, msg: "Error During Signup !" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default insertNewUser;
