import addAddress from "./routes/addAddress";
import addBookToCart from "./routes/addBookToCart";
import checkForgetPasswordData from "./routes/checkForgetPasswordData";
import checkLoginData from "./routes/checkLoginData";
import checkSignupData from "./routes/checkSignupData";
import checkTfaCode from "./routes/checkTfaCode";
import deleteAddress from "./routes/deleteAddress";
import getFilteredBooks from "./routes/getFilteredBooks";
import getFreshTfaCode from "./routes/getFreshTfaCode";
import getUpdatedAddresses from "./routes/getUpdatedAddresses";
import getUpdatedCart from "./routes/getUpdatedCart";
import handleBookMark from "./routes/handleBookMark";
import insertOrder from "./routes/insertOrder";
import removeAllOfBookFromCart from "./routes/removeAllOfBookFromCart";
import removeBookFromCart from "./routes/removeBookFromCart";
import resetPassword from "./routes/resetPassword";
import signup from "./routes/signup";
import updateAddress from "./routes/updateAddress";
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
  addBookToCart,
  getUpdatedCart,
  removeBookFromCart,
  removeAllOfBookFromCart,
  addAddress,
  deleteAddress,
  getUpdatedAddresses,
  updateAddress,
  insertOrder,
};

export default rootValue;
