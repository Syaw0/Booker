import { createConnection } from "mariadb";
import { dbInfo } from "../dbController";

const removeAllOfBookFromCart = async (
  userId: string,
  bookId: string,
  curCart: string[]
) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    curCart = curCart.filter((s) => s != bookId);
    const newCart = JSON.stringify(curCart);
    await con.query(`
      UPDATE users SET cart='${newCart}' WHERE userId="${userId}"
    `);

    return {
      status: true,
      msg: "Successfully Remove Book From Cart!",
    };
  } catch (err) {
    return { status: false, msg: "Error During Remove From Cart!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default removeAllOfBookFromCart;
