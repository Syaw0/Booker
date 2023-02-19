import { pool } from "../dbController";

const removeBookFromWishlist = async (
  userId: string,
  curWishlist: string[],
  bookId: string
) => {
  let con;
  try {
    con = await pool.getConnection();

    const newWishlist = JSON.stringify(
      curWishlist.filter((id) => id != bookId)
    );
    await con.query(`
      UPDATE users SET wishlist='${newWishlist}' WHERE userId="${userId}"
    `);

    return { status: true, msg: "Successfully Update Wishlist!" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Remove Book From Wishlist!" };
  } finally {
    if (con != null) {
      await con.release();
    }
  }
};

export default removeBookFromWishlist;