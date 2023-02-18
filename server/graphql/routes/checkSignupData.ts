import setTfaSession from "../../../db/utils/setTfaSession";
import checkEmailExistence from "../../../db/utils/checkEmailExistence";

interface CheckSignupDataTypes {
  email: string;
}

const checkSignupData = async (data: CheckSignupDataTypes) => {
  try {
    const result = await checkEmailExistence(data.email);
    if (!result.status && result.isError == null) {
      await setTfaSession(data.email);
      return { status: true, msg: "Data is Correct!" };
    }
    if (result.status) {
      return { status: false, msg: "Email Exist!" };
    }
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Check Signup Data!" };
  }
};

export default checkSignupData;
