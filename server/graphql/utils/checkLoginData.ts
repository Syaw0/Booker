import checkEmailAndPassword from "../../../db/utils/checkEmailAndPassword";
import { Request } from "express";

interface CheckLoginDataTypes {
  email: string;
  password: string;
}

const checkLoginData = async (data: CheckLoginDataTypes, req: Request) => {
  try {
    const result = await checkEmailAndPassword(data.email, data.password);
    if (!result.status) {
      return result;
    }
    // if its okay send mail to email and set tfa session
  } catch (err) {
    return {
      status: false,
      msg: "Error During Perform Check Login!",
    };
  }
};

export default checkLoginData;
