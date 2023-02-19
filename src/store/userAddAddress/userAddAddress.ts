import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserAddAddressPagePropsTypes = {
  actionType: "userAddAddress",
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
  isLogin: false,
  menuItems: [],
  navbarItems: navItems,
  user: {
    wishlist: [],
    addresses: [],
    cart: [],
    orders: [],
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
};

const userAddAddressSlice = createSlice({
  name: "userAddAddress",
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
      newList = newList.filter((item: any) => item.name !== action.payload);
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

const makeStore = (preState: Partial<UserAddAddressPagePropsTypes>) => {
  return configureStore({
    reducer: userAddAddressSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userAddAddressSlice.actions.addToMenu;
export const addToNav = userAddAddressSlice.actions.addToNav;
export const popFromMenu = userAddAddressSlice.actions.popFromMenu;
export const popFromNav = userAddAddressSlice.actions.popFromNav;
export const updateAddress = userAddAddressSlice.actions.updateAddress;

export default makeStore;
export type RootState = typeof initialState;
