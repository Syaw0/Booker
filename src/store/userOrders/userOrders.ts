import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserOrdersPagePropsTypes = {
  actionType: "userOrders",
  isLogin: false,
  orders: [],
  menuItems: [],
  navbarItems: navItems,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
};

const userOrdersSlice = createSlice({
  name: "userOrders",
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

    updateStates(preState, action: PayloadAction<UserCartPageUpdateData>) {
      return {
        ...preState,
        addresses: action.payload.addresses,
        books: action.payload.books,
        priceSummary: action.payload.priceSummary,
        user: { ...preState.user, ...action.payload.user },
      };
    },
  },
});

const makeStore = (preState: Partial<UserCartPagePropsTypes>) => {
  return configureStore({
    reducer: userOrdersSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userOrdersSlice.actions.addToMenu;
export const addToNav = userOrdersSlice.actions.addToNav;
export const popFromMenu = userOrdersSlice.actions.popFromMenu;
export const popFromNav = userOrdersSlice.actions.popFromNav;

export default makeStore;
export type RootState = typeof initialState;
