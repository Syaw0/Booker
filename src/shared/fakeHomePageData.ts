import { book1, book2, book3, book4 } from "./fakeBooks";
import { fakeUser } from "./fakeUser";

const fakeHomePageData: HomePagePropsTypes = {
  booksIntroducers: {
    mainIntroducers: [
      {
        books: [
          book1,
          book2,
          book3,
          book4,
          book1,
          book2,
          book3,
          book4,
          book1,
          book2,
          book3,
          book4,
        ],
        hrefToAllBooks: "/",
        introducingName: "Popular",
      },
      {
        books: [
          book1,
          book2,
          book3,
          book4,
          book1,
          book2,
          book3,
          book4,
          book1,
          book2,
          book3,
          book4,
        ],
        hrefToAllBooks: "/",
        introducingName: "Today's Hot ",
      },
      {
        books: [
          book1,
          book2,
          book3,
          book4,
          book1,
          book2,
          book3,
          book4,
          book1,
          book2,
          book3,
          book4,
        ],
        hrefToAllBooks: "/",
        introducingName: "User Suggests",
      },
    ],
  },
  isLogin: true,
  user: fakeUser,
};

export default fakeHomePageData;
