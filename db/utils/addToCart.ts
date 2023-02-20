import { pool } from "../../db/dbController";

const addToCart = async (userId: string, bookId: string, curCart: string[]) => {
  let con;
  try {
    con = await pool.getConnection();
    const newCart = JSON.stringify([...curCart, bookId]);

    await con.query(`
      UPDATE users SET cart='${newCart}' WHERE userId="${userId}"
    `);

    return {
      status: true,
      msg: "Successfully Add Book To User Cart!",
    };
  } catch (err) {
    return { status: false, msg: "Error During Add To Cart!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default addToCart;
