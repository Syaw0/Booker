import redisCheckAndConnect from "./redisCheckAndConnect";

const checkTfaCodeFromEmail = async (email: string, tfaCode: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(2);
    const formatEmail = email.split(".").join("");
    const checkSession = await redis.hGetAll(formatEmail);
    console.log(checkSession);
    if (checkSession.token == null) {
      return {
        status: false,
        msg: "No Session Found With This Email!",
      };
    }

    const tries = await redis.hIncrBy(formatEmail, "try", 1);
    if (Number(tries) >= 3) {
      return {
        status: false,
        msg: "Your Tfa Code Is Expired!",
      };
    }
    if (checkSession.token !== tfaCode) {
      return {
        status: false,
        msg: `Tfa Code is Wrong You Have ${3 - Number(tries)} Chance To Try!`,
      };
    }

    await redis.del(formatEmail);
    return {
      status: true,
      msg: "Otp Code Is Correct!",
    };
  } catch (err) {
    return {
      status: false,
      msg: "Error During Check Tfa Code!",
    };
  }
};

export default checkTfaCodeFromEmail;
