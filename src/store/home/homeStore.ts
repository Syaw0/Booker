import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HomePagePropsTypes = {
  booksIntroducers: {
    mainIntroducers: [],
  },
  isLogin: false,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
});

const makeStore = (preState: Partial<HomePagePropsTypes>) => {
  return configureStore({
    reducer: homeSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export default makeStore;
export type RootState = typeof initialState;
