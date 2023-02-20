import { pool } from "../../db/dbController";

const getOrder = async (orderId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    let order = await con.query(`
      SELECT * FROM orders WHERE orderId="${orderId}"
    `);
    if (order.length == 0) {
      return { status: false, msg: "Not Found Anything!" };
    }

    order[0].address = JSON.parse(order[0].address);
    order[0].books = JSON.parse(order[0].books);
    order[0].priceSummary = JSON.parse(order[0].priceSummary);

    return {
      status: true,
      msg: "Found!",
      data: order[0],
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "Error During Get Order!",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getOrder;
