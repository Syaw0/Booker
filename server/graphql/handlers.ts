import checkForgetPasswordData from "./routes/checkForgetPasswordData";
import checkLoginData from "./routes/checkLoginData";
import checkSignupData from "./routes/checkSignupData";
import checkTfaCode from "./routes/checkTfaCode";
import getFilteredBooks from "./routes/getFilteredBooks";
import getFreshTfaCode from "./routes/getFreshTfaCode";
import handleBookMark from "./routes/handleBookMark";
import resetPassword from "./routes/resetPassword";
import signup from "./routes/signup";
import updateUserData from "./routes/updateUserData";

const rootValue = {
  checkLoginInformation: checkLoginData,
  checkTfaCode,
  getFreshTfaCode,
  signup,
  checkForgetPasswordData,
  resetPassword,
  checkSignupData,
  getFilteredBooks,
  handleBookMark,
  updateUserData,
};

export default rootValue;
