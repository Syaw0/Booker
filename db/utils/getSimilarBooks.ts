import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const getSimilarBooks = async (bookId: string, category: string) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    const similarBooks = await con.query(`
      SELECT * FROM books WHERE bookId != "${bookId}" and category="${category}" LIMIT 0,10
    `);
    if (similarBooks.length == 0) {
      return { status: false, msg: "Can Not Found Anything!" };
    }
    return {
      status: true,
      msg: "Found!",
      data: similarBooks.slice(0, similarBooks.length),
    };
  } catch (err) {
    return {
      status: false,
      msg: "Error During GetSimilar Books!",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getSimilarBooks;
