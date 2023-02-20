import { book1, book2, book3, book4 } from "./fakeBooks";
import { fakeOrder1 } from "./fakeOrders";
import { fakeUser } from "./fakeUser";

const fakeUserOrderIdPageData: UserOrderIdPagePropsTypes = {
  isLogin: true,
  actionType: "userOrderId",
  menuItems: [],
  navbarItems: [],
  user: fakeUser,
  order: {
    ...fakeOrder1,
    books: [
      { ...book1, num: 2 },
      { ...book2, num: 3 },
      { ...book3, num: 2 },
      { ...book4, num: 5 },
    ],
  },
};

export default fakeUserOrderIdPageData;
