import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserCartPagePropsTypes = {
  isLogin: false,
  priceSummary: {
    shipping: "",
    subTotal: "",
    tax: "",
    total: "",
  },
  addresses: [],
  books: [],
  menuItems: [],
  navbarItems: navItems,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
};

const userCartSlice = createSlice({
  name: "userCart",
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
  },
});

const makeStore = (preState: Partial<UserCartPagePropsTypes>) => {
  return configureStore({
    reducer: userCartSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userCartSlice.actions.addToMenu;
export const addToNav = userCartSlice.actions.addToNav;
export const popFromMenu = userCartSlice.actions.popFromMenu;
export const popFromNav = userCartSlice.actions.popFromNav;

export default makeStore;
export type RootState = typeof initialState;
