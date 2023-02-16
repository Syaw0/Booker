import { fakeUser } from "./fakeUser";

const fakeUserAddAddressPageData: UserAddAddressPagePropsTypes = {
  isLogin: true,
  menuItems: [],
  navbarItems: [],
  address: {
    city: "",
    country: "",
    receiverName: "",
    state: "",
    street: "",
    tel: "",
    title: "",
    zipCode: "",
  },
  actionType: "userAddAddress",
  user: fakeUser,
};

export default fakeUserAddAddressPageData;
