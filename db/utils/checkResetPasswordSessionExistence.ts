import redisCheckAndConnect from "./redisCheckAndConnect";

const checkResetPasswordSessionExistence = async (email: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(3);
    const isExist = await redis.get(email);
    if (isExist == null) {
      return {
        status: false,
        msg: "Error , Can Not Found Reset Password Session!",
      };
    }
    return { status: true, msg: "Found it!" };
  } catch (err) {
    return { status: false, msg: "Error In Check Reset Password Session!" };
  }
};

export default checkResetPasswordSessionExistence;
