import { book1, book2, book3, book4 } from "./fakeBooks";
import { fakeOrder1 } from "./fakeOrders";

const fakeUserOrderIdPageData: UserOrderIdPagePropsTypes = {
  isLogin: true,
  actionType: "userOrderId",
  menuItems: [],
  navbarItems: [],
  user: {
    cartNumber: 1,
    email: "",
    profileUrl:
      "https://user-images.githubusercontent.com/90524474/218326887-539649b7-a556-4214-a5a3-3d4e7e541bd2.jpg?w=128&q=50",
    userId: "1",
  },
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
