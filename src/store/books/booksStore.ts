import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BooksPagePropsTypes = {
  isLogin: false,
  isFilterOpen: true,
  user: {
    cartNumber: 0,
    email: "",
    profileUrl: "",
    userId: "",
    wishlist: [],
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
    setPriceRange(
      preState,
      action: PayloadAction<Partial<typeof initialState.filters.priceRange>>
    ) {
      return {
        ...preState,
        filters: {
          ...preState.filters,
          priceRange: {
            ...preState.filters.priceRange,
            ...action.payload,
          },
        },
      };
    },
    removeCategoryFromFilter(preState, action: PayloadAction<CategoriesType>) {
      let newList = preState.filters.categories;
      newList = newList.filter((s) => s !== action.payload);
      return {
        ...preState,
        filters: {
          ...preState.filters,
          categories: newList,
        },
      };
    },

    addCategoryFromFilter(preState, action: PayloadAction<CategoriesType>) {
      let newList = preState.filters.categories.concat(action.payload);

      return {
        ...preState,
        filters: {
          ...preState.filters,
          categories: newList,
        },
      };
    },

    toggleFilterOpening(preState, action: PayloadAction<boolean>) {
      return {
        ...preState,
        isFilterOpen: action.payload,
      };
    },
    replaceBooks(preState, action: PayloadAction<BookCardPropsType[]>) {
      return {
        ...preState,
        books: action.payload,
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
export const setPriceRange = booksSlice.actions.setPriceRange;
export const removeCategoryFromFilter =
  booksSlice.actions.removeCategoryFromFilter;
export const addCategoryFromFilter = booksSlice.actions.addCategoryFromFilter;
export const toggleFilterOpening = booksSlice.actions.toggleFilterOpening;
export const replaceBooks = booksSlice.actions.replaceBooks;

export default makeStore;
export type RootState = typeof initialState;
