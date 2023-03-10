import generateDbBase from "scripts/generateDbBase";
import { Connection, createConnection, PoolConnection } from "mariadb";
import { dbInfo, pool } from "scripts/dbConnectors";
import {
  addressesFields,
  bookFields,
  introducersField,
  ordersFields,
  userFields,
} from "./dbFields";

describe("Test MariaDB Scheme", () => {
  beforeAll(async () => {
    await generateDbBase();
  });

  it("Test If Database Created ", async () => {
    let mariaClient = await createConnection(dbInfo);
    const databases = await mariaClient.query("SHOW DATABASES");
    const res = databases.filter((db: { Database: string }) => {
      return db.Database === "booker";
    });
    expect(res).toHaveLength(1);
    await mariaClient.end();
  });

  it("Test if Tables Are Created", async () => {
    let mariaClient = await createConnection(dbInfo);
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
    await mariaClient.end();
  });
  it("Test MARIADB Fields: USERS TABLE", async () => {
    let mariaClient = await createConnection(dbInfo);
    const users = await mariaClient.query("DESCRIBE booker.users");

    users.forEach((user: any) => {
      const tmp: any = userFields[user.Field as keyof typeof userFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(user[tmpKey]);
      });
    });
    await mariaClient.end();
  });

  it("Test MARIADB Fields: BOOKS TABLE", async () => {
    let mariaClient = await createConnection(dbInfo);
    const books = await mariaClient.query("DESCRIBE booker.books");

    books.forEach((book: any) => {
      const tmp: any = bookFields[book.Field as keyof typeof bookFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(book[tmpKey]);
      });
    });
    await mariaClient.end();
  });

  it("Test MARIADB Fields: ADDRESSES TABLE", async () => {
    let mariaClient = await createConnection(dbInfo);
    const addresses = await mariaClient.query("DESCRIBE booker.addresses");

    addresses.forEach((add: any) => {
      const tmp: any =
        addressesFields[add.Field as keyof typeof addressesFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(add[tmpKey]);
      });
    });
    await mariaClient.end();
  });

  it("Test MARIADB Fields: ORDERS TABLE", async () => {
    let mariaClient = await createConnection(dbInfo);
    const orders = await mariaClient.query("DESCRIBE booker.orders");

    orders.forEach((order: any) => {
      const tmp: any = ordersFields[order.Field as keyof typeof ordersFields];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(order[tmpKey]);
      });
    });
    await mariaClient.end();
  });
  it("Test MARIADB Fields: INTRODUCERS TABLE", async () => {
    let mariaClient = await createConnection(dbInfo);
    const introducers = await mariaClient.query("DESCRIBE booker.introducers");
    introducers.forEach((introducer: any) => {
      let tmp: any;
      tmp = introducersField[introducer.Field as keyof typeof introducersField];
      Object.keys(tmp).forEach((tmpKey: string) => {
        expect(tmp[tmpKey]).toEqual(introducer[tmpKey]);
      });
    });
    await mariaClient.end();
  });
});
