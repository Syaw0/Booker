import setResetPasswordSession from "../../../db/utils/setResetPasswordSession";
import checkTfaCodeFromEmail from "../../../db/utils/checkTfaCodeFromEmail";
import { Response } from "express";
import setLoginSessionCookie from "../../../db/utils/setLoginSessionCookie";
import setLoginSession from "../../../db/utils/setLoginSession";

interface CheckTfaCodeTypes {
  email: string;
  tfaCode: string;
  isReset: boolean;
  isSignup: boolean;
}

const checkTfaCode = async (
  data: CheckTfaCodeTypes,
  incomeMessage: { res: Response }
) => {
  try {
    const result = await checkTfaCodeFromEmail(data.email, data.tfaCode);

    if (result.status) {
      if (data.isReset) {
        await setResetPasswordSession(data.email);
      } else if (!data.isSignup) {
        await setLoginSession(data.email);
        await setLoginSessionCookie(data.email, incomeMessage.res);
      }
    }
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Perform Checking Tfa Code!" };
  }
};
export default checkTfaCode;
