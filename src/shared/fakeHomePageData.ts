import { book1, book2, book3, book4 } from "./fakeBooks";

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
  user: {
    cartNumber: 3,
    email: "s@gmail.com",
    profileUrl:
      "https://user-images.githubusercontent.com/90524474/218326887-539649b7-a556-4214-a5a3-3d4e7e541bd2.jpg?w=128&q=50",
    userId: "1",
  },
};

export default fakeHomePageData;
