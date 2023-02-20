import { SHA256 } from "crypto-js";
import { createConnection } from "mariadb";
import { dbInfo } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";

const setLoginSession = async (email: string) => {
  let con;
  try {
    con = await createConnection(dbInfo);
    const redis = await redisCheckAndConnect();
    await redis.select(1);
    const user = await con.query(`
      SELECT * FROM users WHERE email="${email}"
    `);
    if (user.length == 0) {
      return { status: false, msg: "Error Can Not Found User With This Email" };
    }

    await redis.set(SHA256(email).toString(), user[0].userId);
    return {
      status: true,
      msg: "Set Login Session Successfully!",
    };
  } catch (err) {
    return { status: false, msg: "Error During Set Login Session In Redis!" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default setLoginSession;
