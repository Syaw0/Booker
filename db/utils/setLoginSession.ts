import { SHA256 } from "crypto-js";
import redisCheckAndConnect from "./redisCheckAndConnect";

const setLoginSession = async (email: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(1);
    await redis.set(SHA256(email).toString(), "");
    return { status: true, msg: "Set Login Session Successfully!" };
  } catch (err) {
    return { status: false, msg: "Error During Set Login Session In Redis!" };
  }
};

export default setLoginSession;
