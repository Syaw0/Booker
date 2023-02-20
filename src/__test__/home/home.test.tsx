import HomePage from "src/pages";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { book1, book2, book3, book4 } from "src/shared/fakeBooks";
import { fakeUser } from "src/shared/fakeUser";

jest.mock("db/utils/checkSession", () => jest.fn());
jest.mock("db/utils/getUserById", () => jest.fn());
jest.mock("db/utils/getIntroducers", () => jest.fn());

jest.mock("next/router", () => require("next-router-mock"));

const fakeProps1: HomePagePropsTypes = {
  isLogin: false,
  user: fakeUser,
  booksIntroducers: {
    mainIntroducers: [
      {
        books: [book1, book2],
        hrefToAllBooks: "/name",
        introducingName: "IntroduceName",
      },
    ],
  },
};

const fakeProps2: HomePagePropsTypes = {
  isLogin: false,
  user: fakeUser,
  booksIntroducers: {
    mainIntroducers: [
      {
        books: [book3, book4],
        hrefToAllBooks: "/name1",
        introducingName: "IntroduceName1",
      },
      {
        books: [book1, book2],
        hrefToAllBooks: "/name2",
        introducingName: "IntroduceName2",
      },
    ],
  },
};

const CustomParent = (props: HomePagePropsTypes) => {
  return <HomePage {...props} />;
};

describe("Test Page : Home", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeProps1} />);
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("homepageHolder")).toBeInTheDocument();
    const introducerHolder = screen.getByTestId("homepageIntroducerHolder");
    expect(introducerHolder).toBeInTheDocument();
    fakeProps1.booksIntroducers.mainIntroducers.forEach((int) => {
      expect(
        screen.getByTestId(`bookIntroducer_${int.introducingName}`)
      ).toBeInTheDocument();
      int.books.forEach((book) => {
        expect(
          screen.getByTestId(`bookCardHolder_${book.bookId}`)
        ).toBeInTheDocument();
      });
    });
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
  });

  it("its render properly with other data", () => {
    render(<CustomParent {...fakeProps2} />);
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("homepageHolder")).toBeInTheDocument();
    const introducerHolder = screen.getByTestId("homepageIntroducerHolder");
    expect(introducerHolder).toBeInTheDocument();
    fakeProps2.booksIntroducers.mainIntroducers.forEach((int) => {
      expect(
        screen.getByTestId(`bookIntroducer_${int.introducingName}`)
      ).toBeInTheDocument();
      int.books.forEach((book) => {
        expect(
          screen.getByTestId(`bookCardHolder_${book.bookId}`)
        ).toBeInTheDocument();
      });
    });
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
  });
});
