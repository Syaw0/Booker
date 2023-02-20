import { pool } from "../../db/dbController";

const addOrder = async (
  address: any,
  books: any,
  priceSummary: any,
  userId: any
) => {
  let con;

  try {
    con = await pool.getConnection();
    let formattedData: any = new Date();
    formattedData = `${formattedData.getUTCFullYear()}-${formattedData.getUTCMonth()}-${formattedData.getUTCDate()}-${formattedData.getUTCHours()}-${formattedData.getUTCMinutes()}-${formattedData.getUTCSeconds()}`;

    await con.query(
      `
      INSERT INTO orders (date,priceSummary,address,books,userId) VALUES(?,?,?,?,?)
    `,
      [
        formattedData,
        JSON.stringify(priceSummary),
        JSON.stringify(address),
        JSON.stringify(books),
        userId,
      ]
    );

    const order = await con.query(`
      SELECT * FROM orders WHERE userId="${userId}" and date="${formattedData}"
      `);

    if (order.length == 0) {
      return { status: false, msg: "Order Is Not Created!" };
    }

    await con.query(`
      UPDATE users SET cart='[]' WHERE userId="${userId}"
    `);

    return {
      status: true,
      msg: "Add it To Orders!",
      data: { orderId: order[0].orderId },
    };
  } catch (err) {
    return { status: false, msg: "Error During Add Order!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default addOrder;
