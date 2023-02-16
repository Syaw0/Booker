import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserOrderIdPagePropsTypes = {
  actionType: "userOrderId",
  isLogin: false,
  order: {
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
    books: [],
    date: "",
    orderId: "",
    state: "delivered",
    priceSummary: {
      shipping: "",
      subTotal: "",
      tax: "",
      total: "",
    },
  },
  menuItems: [],
  navbarItems: navItems,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
};

const userOrderIdSlice = createSlice({
  name: "userOrderId",
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
    reducer: userOrderIdSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userOrderIdSlice.actions.addToMenu;
export const addToNav = userOrderIdSlice.actions.addToNav;
export const popFromMenu = userOrderIdSlice.actions.popFromMenu;
export const popFromNav = userOrderIdSlice.actions.popFromNav;

export default makeStore;
export type RootState = typeof initialState;
