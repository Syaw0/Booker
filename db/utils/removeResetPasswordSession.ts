import redisCheckAndConnect from "./redisCheckAndConnect";

const removeResetPasswordSession = async (email: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(3);
    const result = await redis.del(email);
    if (!result) {
      return {
        status: false,
        msg: "Error , Can Not Found Session To Remove It!",
      };
    }
    return { status: true, msg: "Found it And Remove It!" };
  } catch (err) {
    return { status: false, msg: "Error In Remove Reset Password Session!" };
  }
};

export default removeResetPasswordSession;
