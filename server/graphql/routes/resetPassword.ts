import removeResetPasswordSession from "../../../db/utils/removeResetPasswordSession";
import checkResetPasswordSessionExistence from "../../../db/utils/checkResetPasswordSessionExistence";
import resettingPassword from "../../../db/utils/resettingPassword";
import checkEmailAndPassword from "../../../db/utils/checkEmailAndPassword";

interface ResetPasswordTypes {
  email: string;
  oldPassword: string;
  newPassword: string;
}

const resetPassword = async (data: ResetPasswordTypes) => {
  try {
    const isSessionExist = await checkResetPasswordSessionExistence(data.email);
    if (!isSessionExist.status) return isSessionExist;
    const checkPassAndEmailResult = await checkEmailAndPassword(
      data.email,
      data.oldPassword
    );
    if (!checkPassAndEmailResult.status) return checkPassAndEmailResult;
    const rmResetPassSession = await removeResetPasswordSession(data.email);
    if (!rmResetPassSession.status) return rmResetPassSession;
    const result = await resettingPassword(
      data.email,
      data.oldPassword,
      data.newPassword
    );
    return result;
  } catch (err) {
    return { status: false, msg: "Error During Perform Resetting Password!" };
  }
};

export default resetPassword;
