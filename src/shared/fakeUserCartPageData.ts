import { address1, address2, address3 } from "./fakeAddresses";
import { book1, book2, book3, book4 } from "./fakeBooks";
import { fakeUser } from "./fakeUser";

const fakeUserCartPageData: UserCartPagePropsTypes = {
  actionType: "userCart",
  isLogin: true,
  menuItems: [],
  addresses: [address1, address2, address3],
  books: [
    { ...book1, num: 2 },
    { ...book2, num: 3 },
    { ...book3, num: 2 },
    { ...book4, num: 5 },
  ],
  priceSummary: {
    shipping: "1",
    subTotal: "12",
    tax: "1",
    total: "14",
  },
  navbarItems: [],
  user: fakeUser,
};

export default fakeUserCartPageData;
