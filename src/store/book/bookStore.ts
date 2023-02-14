import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BookPagePropsTypes = {
  booksIntroducers: {
    similar: { books: [], hrefToAllBooks: "", introducingName: "" },
  },
  isLogin: false,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
  },
  book: {
    author: "",
    bookId: "",
    category: "psychology",
    image: "",
    name: "",
    price: "",
    description: "",
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    replaceUserData(
      preState,
      action: PayloadAction<BookPagePropsTypes["user"]>
    ) {
      return {
        ...preState,
        user: action.payload,
      };
    },
  },
});

const makeStore = (preState: Partial<BooksPagePropsTypes>) => {
  return configureStore({
    reducer: bookSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const replaceUserData = bookSlice.actions.replaceUserData;

export default makeStore;
export type RootState = typeof initialState;
