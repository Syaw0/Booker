import { pool } from "../../db/dbController";

const getBookById = async (id: string | number) => {
  let con;

  try {
    con = await pool.getConnection();
    const book = await con.query(`
      SELECT * FROM books WHERE bookId="${id}"
    `);
    if (book.length == 0) {
      return {
        status: false,
        msg: "Not Found Book!",
      };
    }
    return {
      status: true,
      msg: "Found it!",
      data: book[0],
    };
  } catch (err) {
    return { status: false, msg: "Error During Get Book!" };
  } finally {
    if (con != null) {
      await con.release();
    }
  }
};

export default getBookById;