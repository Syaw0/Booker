import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserCartPagePropsTypes = {
  isLogin: false,
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
    popFromMenu(preState, action: PayloadAction<(typeof navItems)[number]>) {
      let newList = preState.menuItems;
      newList = newList.filter((item) => item.name !== action.payload.name);
      return {
        ...preState,
        menuItems: newList,
      };
    },

    addToNav(preState, action: PayloadAction<(typeof navItems)[number]>) {
      return {
        ...preState,
        navbarItems: [...preState.menuItems, action.payload],
      };
    },
    popFromNav(preState, action: PayloadAction<(typeof navItems)[number]>) {
      let newList = preState.menuItems;
      newList = newList.filter((item) => item.name !== action.payload.name);
      return {
        ...preState,
        menuItems: newList,
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
