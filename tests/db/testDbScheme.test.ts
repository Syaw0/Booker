import generateDbBase from "scripts/generateDbBase";
import { PoolConnection } from "mariadb";
import { pool } from "scripts/dbConnectors";
import {
  addressesFields,
  bookFields,
  ordersFields,
  userFields,
} from "./dbFields";

let mariaClient: PoolConnection;

describe("Test MariaDB Scheme", () => {
  beforeAll(async () => {
    await generateDbBase();
    mariaClient = await pool.getConnection();
  });

  afterAll(async () => {
    await mariaClient.end();

    // killContainers();
  });
  it("Test If Database Created ", async () => {
    const databases = await mariaClient.query("SHOW DATABASES");
    const res = databases.filter((db: { Database: string }) => {
      return db.Database === "booker";
    });
    expect(res).toHaveLength(1);
  });

  it("Test if Tables Are Created", async () => {
    const tables = await mariaClient.query("SHOW TABLES from booker");
    const res = tables.filter((table: { Tables_in_booker: string }) => {
      return (
        table.Tables_in_booker === "users" ||
        table.Tables_in_booker === "books" ||
        table.Tables_in_booker === "orders" ||
        table.Tables_in_booker === "addresses" ||
        table.Tables_in_booker === "introducers"
      );
    });
    expect(res).toHaveLength(5);
  });
  it("Test MARIADB Fields: USERS TABLE", async () => {
    const users = await mariaClient.query("DESCRIBE booker.users");

    users.forEach((user: any) => {
      const tmp: any = userFields[user.Field as keyof typeof userFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(user[tmpKey]);
      });
    });
  });

  it("Test MARIADB Fields: BOOKS TABLE", async () => {
    const books = await mariaClient.query("DESCRIBE booker.books");

    books.forEach((book: any) => {
      const tmp: any = bookFields[book.Field as keyof typeof bookFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(book[tmpKey]);
      });
    });
  });

  it("Test MARIADB Fields: ADDRESSES TABLE", async () => {
    const addresses = await mariaClient.query("DESCRIBE booker.addresses");

    addresses.forEach((add: any) => {
      const tmp: any =
        addressesFields[add.Field as keyof typeof addressesFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(add[tmpKey]);
      });
    });
  });

  it("Test MARIADB Fields: ORDERS TABLE", async () => {
    const orders = await mariaClient.query("DESCRIBE booker.orders");

    orders.forEach((order: any) => {
      const tmp: any = ordersFields[order.Field as keyof typeof ordersFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(order[tmpKey]);
      });
    });
  });
});
