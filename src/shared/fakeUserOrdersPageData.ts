import { fakeOrder1, fakeOrder2, fakeOrder3 } from "./fakeOrders";
import { fakeUser } from "./fakeUser";

const fakeUserOrdersPageData: UserOrdersPagePropsTypes = {
  isLogin: true,
  actionType: "userOrders",
  menuItems: [],
  navbarItems: [],
  user: fakeUser,
  orders: [fakeOrder1, fakeOrder2, fakeOrder3],
};

export default fakeUserOrdersPageData;
