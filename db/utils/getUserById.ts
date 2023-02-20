import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const getUserById = async (userId: string) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    const result = await con.query(`
      SELECT * FROM users WHERE userId="${userId}"
    `);

    if (result[0] != null) {
      result[0].orders = JSON.parse(result[0].orders);
      result[0].cart = JSON.parse(result[0].cart);
      result[0].wishlist = JSON.parse(result[0].wishlist);
      result[0].addresses = JSON.parse(result[0].addresses);
    }
    return { status: true, msg: "Found User!", data: result[0] };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During GetUser From Maria!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getUserById;
