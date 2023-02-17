import generateTfToken from "../../server/utils/generateTfaToken";
import sendTfaTokenToEmail from "../../server/utils/sendTfaTokenToEmail";
import redisCheckAndConnect from "./redisCheckAndConnect";

const setTfaSession = async (email: string) => {
  try {
    const redis = await redisCheckAndConnect();
    await redis.select(2);
    const randomNumber = generateTfToken();
    await redis.set(email, randomNumber);
    await sendTfaTokenToEmail(email, randomNumber);
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
