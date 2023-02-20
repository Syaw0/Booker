import { pool } from "../../db/dbController";

const addBookToWishlist = async (
  userId: string,
  curWishlist: string[],
  bookId: string
) => {
  let con;
  try {
    con = await pool.getConnection();
    const newWishlist = JSON.stringify([...curWishlist, bookId]);
    await con.query(`
      UPDATE users SET wishlist='${newWishlist}' WHERE userId="${userId}"
    `);

    return { status: true, msg: "Successfully Update Wishlist!" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Add Book To Wishlist!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default addBookToWishlist;
