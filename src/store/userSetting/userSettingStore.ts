import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import navItems from "src/shared/userDashNavItems";

const initialState: UserSettingPagePropsTypes = {
  actionType: "userSetting",
  isLogin: false,
  menuItems: [],
  navbarItems: navItems,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
    wishlist: [],
  },
};

const userSettingSlice = createSlice({
  name: "userSetting",
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

const makeStore = (preState: Partial<UserSettingPagePropsTypes>) => {
  return configureStore({
    reducer: userSettingSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const addToMenu = userSettingSlice.actions.addToMenu;
export const addToNav = userSettingSlice.actions.addToNav;
export const popFromMenu = userSettingSlice.actions.popFromMenu;
export const popFromNav = userSettingSlice.actions.popFromNav;

export default makeStore;
export type RootState = typeof initialState;
