import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserCartPagePropsTypes = {
  isLogin: false,
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
  reducers: {},
});

const makeStore = (preState: Partial<UserCartPagePropsTypes>) => {
  return configureStore({
    reducer: userCartSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export default makeStore;
export type RootState = typeof initialState;
