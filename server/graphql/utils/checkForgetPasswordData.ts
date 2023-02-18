import setTfaSession from "../../../db/utils/setTfaSession";
import checkEmailExistence from "../../../db/utils/checkEmailExistence";
import SendmailTransport from "nodemailer/lib/sendmail-transport";

interface CheckForgetPasswordDataTypes {
  email: string;
}

const checkForgetPasswordData = async (data: CheckForgetPasswordDataTypes) => {
  try {
    const result = await checkEmailExistence(data.email);
    if (result.status) {
      await setTfaSession(data.email);
    }
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Perform Check Email!" };
  }
};

export default checkForgetPasswordData;
