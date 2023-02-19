import { pool } from "../dbController";

const removeBookFromCart = async (
  userId: string,
  bookId: string,
  curCart: string[]
) => {
  let con;
  try {
    con = await pool.getConnection();
    curCart.splice(curCart.indexOf(bookId), 1);
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
      await con.release();
    }
  }
};

export default removeBookFromCart;