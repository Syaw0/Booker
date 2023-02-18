import checkTfaCodeFromEmail from "../../../db/utils/checkTfaCodeFromEmail";

interface CheckTfaCodeTypes {
  email: string;
  tfaCode: string;
  isReset: boolean;
  isSignup: boolean;
}

const checkTfaCode = async (data: CheckTfaCodeTypes) => {
  try {
    const result = await checkTfaCodeFromEmail(data.email, data.tfaCode);
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Perform Checking Tfa Code!" };
  }
};
export default checkTfaCode;
