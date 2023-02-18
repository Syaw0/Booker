import redisCheckAndConnect from "./redisCheckAndConnect";

const checkSession = async (cookies: any) => {
  try {
    if (cookies == null || cookies.session == null) {
      return { status: false, msg: "User Has Not Login Session" };
    }
    const redis = await redisCheckAndConnect();
    await redis.select(1);
    const result = await redis.get(cookies.session);
    if (result == null) {
      return { status: false, msg: "User Has Not Login Session" };
    }
    return { status: true, msg: "User Session Found", data: result };
  } catch (err) {
    return { status: false, msg: "Error When Checking Session" };
  }
};

export default checkSession;
