import redisCheckAndConnect from "./redisCheckAndConnect";

const setResetPasswordSession = async (email: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(3);
    redis.set(email, "");
    return {
      status: true,
      msg: "Set Reset Password Session Successfully!",
    };
  } catch (err) {
    return { status: false, msg: "Error During Set Reset Password Session !" };
  }
};

export default setResetPasswordSession;
