import checkForgetPasswordData from "./utils/checkForgetPasswordData";
import checkLoginData from "./utils/checkLoginData";
import checkTfaCode from "./utils/checkTfaCode";
import getFreshTfaCode from "./utils/getFreshTfaCode";
import signup from "./utils/signup";

const rootValue = {
  checkLoginInformation: checkLoginData,
  checkTfaCode,
  getFreshTfaCode,
  signup,
  checkForgetPasswordData,
};

export default rootValue;
