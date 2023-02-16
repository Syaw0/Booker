import { book1, book2 } from "./fakeBooks";
import { fakeUser } from "./fakeUser";

const fakeBooksPageData: BooksPagePropsTypes = {
  books: [book1, book2],
  isFilterOpen: true,
  isLogin: true,
  user: fakeUser,
  filters: {
    categories: ["psychology"],
    keyword: "Momma And meaning of life",
    priceRange: {
      max: "12",
      min: "",
    },
  },
};

export default fakeBooksPageData;
