import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserAddressesPagePropsTypes = {
  actionType: "userAddresses",
  isLogin: false,

  addresses: [],
  menuItems: [],
  navbarItems: navItems,
  user: {
    cartNumber: 0,
    wishlist: [],
    email: "",
    profileUrl: "",
    userId: "",
  },
};

const userAddressesSlice = createSlice({
  name: "userAddresses",
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

    replaceAddresses(preState, action: PayloadAction<Address[]>) {
      return {
        ...preState,
        addresses: action.payload,
      };
    },
  },
});

const makeStore = (preState: Partial<UserAddressesPagePropsTypes>) => {
  return configureStore({
    reducer: userAddressesSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userAddressesSlice.actions.addToMenu;
export const addToNav = userAddressesSlice.actions.addToNav;
export const popFromMenu = userAddressesSlice.actions.popFromMenu;
export const popFromNav = userAddressesSlice.actions.popFromNav;
export const replaceAddresses = userAddressesSlice.actions.replaceAddresses;

export default makeStore;
export type RootState = typeof initialState;
