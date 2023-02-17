import checkLoginData from "./utils/checkLoginData";
import checkTfaCode from "./utils/checkTfaCode";

const rootValue = {
  checkLoginInformation: checkLoginData,
  checkTfaCode,
};

export default rootValue;
