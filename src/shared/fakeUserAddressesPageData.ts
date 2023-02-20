import { address1, address2, address3 } from "./fakeAddresses";
import { fakeUser } from "./fakeUser";

const fakeUserAddressesPageData: UserAddressesPagePropsTypes = {
  isLogin: true,
  menuItems: [],
  addresses: [address1, address2, address3],
  navbarItems: [],
  actionType: "userAddresses",
  user: fakeUser,
};

export default fakeUserAddressesPageData;
