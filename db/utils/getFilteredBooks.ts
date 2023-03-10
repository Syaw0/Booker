import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";

const getFilteredBooks = async (
  query: string,
  len: number | string,
  max: number | string
) => {
  let con;
  try {
    con = await createConnection(dbInfo);

    const books = await con.query(`
    SELECT * FROM books WHERE ${query} LIMIT ${len},${max}
    `);

    return { status: true, msg: "Found!", data: books.slice(0, books.length) };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "Error During Filter Books!", data: [] };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getFilteredBooks;
