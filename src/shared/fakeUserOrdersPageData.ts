import { fakeOrder1, fakeOrder2, fakeOrder3 } from "./fakeOrders";

const fakeUserOrdersPageData: UserOrdersPagePropsTypes = {
  isLogin: true,
  actionType: "userOrders",
  menuItems: [],
  navbarItems: [],
  user: {
    cartNumber: 1,
    email: "",
    profileUrl:
      "https://user-images.githubusercontent.com/90524474/218326887-539649b7-a556-4214-a5a3-3d4e7e541bd2.jpg?w=128&q=50",
    userId: "1",
  },
  orders: [fakeOrder1, fakeOrder2, fakeOrder3],
};

export default fakeUserOrdersPageData;
