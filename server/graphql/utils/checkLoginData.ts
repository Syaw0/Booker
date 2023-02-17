import checkEmailAndPassword from "../../../db/utils/checkEmailAndPassword";
import { Request } from "express";
import setTfaSession from "../../../db/utils/setTfaSession";

interface CheckLoginDataTypes {
  email: string;
  password: string;
}

const checkLoginData = async (data: CheckLoginDataTypes, req: Request) => {
  try {
    const dataCheckResult = await checkEmailAndPassword(
      data.email,
      data.password
    );
    if (!dataCheckResult.status) {
      return dataCheckResult;
    }
    const setTfaResult = await setTfaSession(data.email);
    return setTfaResult;
  } catch (err) {
    return {
      status: false,
      msg: "Error During Perform Check Login!",
    };
  }
};

export default checkLoginData;
