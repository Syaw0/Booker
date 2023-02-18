import { PoolConnection } from "mariadb";
import { pool } from "../../db/dbController";

const getIntroducers = async () => {
  let con: any;
  try {
    con = await pool.getConnection();
    const introducers = await con.query(`
      SELECT * FROM introducers ;
    `);
    let list = await introducers.map(async (intros: any) => {
      const books = JSON.parse(intros.books);
      const makeQuery = books.reduce(
        (s: string, y: string) => `${s} or bookId=${y}`
      );
      const query = `bookId=${makeQuery}`;
      const result = await con.query(`
        SELECT * FROM books WHERE ${query}
      `);
      return {
        introducingName: intros.name,
        hrefToAllBooks: "/",
        books: result.slice(0, result.length),
      };
    });
    const result = await Promise.all(list);
    return { status: true, msg: "", data: result };
  } catch (err) {
    return { status: false, msg: "Error During Get Introducers" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getIntroducers;
