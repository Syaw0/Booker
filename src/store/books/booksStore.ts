import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BooksPagePropsTypes = {
  isLogin: false,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
  books: [],
  filters: {
    categories: [],
    keyword: "",
    priceRange: { max: "", min: "" },
  },
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    setKeyword(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        filters: {
          ...preState.filters,
          keyword: action.payload,
        },
      };
    },
  },
});

const makeStore = (preState: Partial<BooksPagePropsTypes>) => {
  return configureStore({
    reducer: booksSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const setKeyword = booksSlice.actions.setKeyword;

export default makeStore;
export type RootState = typeof initialState;
