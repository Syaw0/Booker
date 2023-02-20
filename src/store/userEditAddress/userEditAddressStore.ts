import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserEditAddressPagePropsTypes = {
  actionType: "userEditAddress",
  address: {
    addressId: "",
    city: "",
    country: "",
    receiverName: "",
    state: "",
    street: "",
    tel: "",
    title: "",
    zipCode: "",
  },
  isLogin: false,
  menuItems: [],
  navbarItems: navItems,
  user: {
    wishlist: [],
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
    addresses: [],
    cart: [],
    orders: [],
  },
};

const userEditAddressSlice = createSlice({
  name: "userEditAddress",
  initialState: initialState,
  reducers: {
    addToMenu(preState, action: PayloadAction<(typeof navItems)[number]>) {
      return {
        ...preState,
        menuItems: [...preState.menuItems, action.payload],
      };
    },
    popFromMenu(preState, action: PayloadAction<string>) {
      let newList = preState.menuItems;
      newList = newList.filter((item) => item.name !== action.payload);
      return {
        ...preState,
        menuItems: newList,
      };
    },

    addToNav(preState, action: PayloadAction<(typeof navItems)[number]>) {
      return {
        ...preState,
        navbarItems: [...preState.navbarItems, action.payload],
      };
    },
    popFromNav(preState, action: PayloadAction<string>) {
      let newList = [...preState.navbarItems];
      newList = newList.filter((item) => item.name !== action.payload);
      return {
        ...preState,
        navbarItems: newList,
      };
    },

    updateAddress(preState, action: PayloadAction<Partial<Address>>) {
      return {
        ...preState,
        address: {
          ...preState.address,
          ...action.payload,
        },
      };
    },
  },
});

const makeStore = (preState: Partial<UserEditAddressPagePropsTypes>) => {
  return configureStore({
    reducer: userEditAddressSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userEditAddressSlice.actions.addToMenu;
export const addToNav = userEditAddressSlice.actions.addToNav;
export const popFromMenu = userEditAddressSlice.actions.popFromMenu;
export const popFromNav = userEditAddressSlice.actions.popFromNav;
export const updateAddress = userEditAddressSlice.actions.updateAddress;

export default makeStore;
export type RootState = typeof initialState;
