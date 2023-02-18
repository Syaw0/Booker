import setLoginSession from "../../../db/utils/setLoginSession";
import setLoginSessionCookie from "../../../db/utils/setLoginSessionCookie";
import { Response } from "express";
import insertNewUser from "../../../db/utils/insertNewUser";

interface SignupTypes {
  email: string;
  password: string;
}

const signup = async (data: SignupTypes, incomeMessage: { res: Response }) => {
  try {
    const result = await insertNewUser(data.email, data.password);
    if (result.status) {
      await setLoginSession(data.email);
      await setLoginSessionCookie(data.email, incomeMessage.res);
    }
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Perform Signup!" };
  }
};

export default signup;
