import { book1, book2, book4 } from "./fakeBooks";
import { fakeUser } from "./fakeUser";

const fakeBookPageData: BookPagePropsTypes = {
  isLogin: true,
  user: fakeUser,
  book: book4,
  booksIntroducers: {
    similar: {
      books: [book1, book2, book4],
      hrefToAllBooks: "/",
      introducingName: "Similar",
    },
  },
};

export default fakeBookPageData;
