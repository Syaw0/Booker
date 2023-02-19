import { pool } from "../../db/dbController";

const getUserOrders = async (userId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    let orders = await con.query(`
      SELECT * FROM orders WHERE userId="${userId}"
    `);
    if (orders.length == 0) {
      return { status: false, msg: "Not Found Anything!" };
    }

    orders = orders.map((order: any) => {
      return {
        ...order,
        priceSummary: JSON.parse(order.priceSummary),
        address: JSON.parse(order.address),
        books: JSON.parse(order.books),
      };
    });

    return {
      status: true,
      msg: "Found!",
      data: orders.slice(0, orders.length),
    };
  } catch (err) {
    return {
      status: false,
      msg: "Error During Get User Orders!",
    };
  } finally {
    if (con != null) {
      await con.release();
    }
  }
};

export default getUserOrders;
