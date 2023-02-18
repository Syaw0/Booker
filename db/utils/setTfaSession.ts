import generateTfToken from "../../server/utils/generateTfaToken";
import sendTfaTokenToEmail from "../../server/utils/sendTfaTokenToEmail";
import redisCheckAndConnect from "./redisCheckAndConnect";

const setTfaSession = async (email: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(2);
    const randomNumber = generateTfToken();
    const formatEmail = email.split(".").join("");
    await redis.hSet(formatEmail, "token", randomNumber);
    await redis.hSet(formatEmail, "try", 0);
    return { status: true, msg: "Successfully Set Tfa Token!" };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "Error During Set Tfa Session!",
    };
  }
};

export default setTfaSession;
