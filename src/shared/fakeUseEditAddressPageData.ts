import { address1 } from "./fakeAddresses";
import { fakeUser } from "./fakeUser";

const fakeUserEditAddressPageData: UserEditAddressPagePropsTypes = {
  isLogin: true,
  menuItems: [],
  navbarItems: [],
  address: {
    ...address1,
  },
  actionType: "userAddAddress",
  user: fakeUser,
};

export default fakeUserEditAddressPageData;
