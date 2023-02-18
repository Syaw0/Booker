import checkForgetPasswordData from "./utils/checkForgetPasswordData";
import checkLoginData from "./utils/checkLoginData";
import checkSignupData from "./utils/checkSignupData";
import checkTfaCode from "./utils/checkTfaCode";
import getFreshTfaCode from "./utils/getFreshTfaCode";
import resetPassword from "./utils/resetPassword";
import signup from "./utils/signup";

const rootValue = {
  checkLoginInformation: checkLoginData,
  checkTfaCode,
  getFreshTfaCode,
  signup,
  checkForgetPasswordData,
  resetPassword,
  checkSignupData,
};

export default rootValue;
