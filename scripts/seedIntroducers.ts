import { createConnection } from "mariadb";
import { dbInfo } from "./dbConnectors";

const introducers = ["Hot Todays", "Popular", "User Suggested"];

const seedIntroducers = async () => {
  const con = await createConnection(dbInfo);

  const allBooks = await con.query(`
    SELECT * FROM booker.books;
  `);
  let num = 10;
  let i = 0;
  for await (let name of introducers) {
    let books = allBooks.slice(i, num + i);
    i += num;
    books = books.map((book: any) => {
      return `${book.bookId}`;
    });
    await con.query(
      `INSERT IGNORE INTO booker.introducers (name,books) VALUES(?,?)`,
      [name, `[${books}]`]
    );
  }

  await con.end();
};

export default seedIntroducers;
