import BookIntroducer from "./bookIntroducer";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { book1, book2 } from "src/shared/fakeBooks";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import router from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (params: BookIntroducerPropsType) => (
  <BookIntroducer {...params} />
);

const fakeProps: BookIntroducerPropsType = {
  books: [book1, book2],
  hrefToAllBooks: "/someUrl",
  introducingName: "Some Name",
};

describe("Test Component : Book Introducer", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeProps} />);
    expect(
      screen.getByTestId(`bookIntroducer_${fakeProps.introducingName}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("bookIntroducerName")).toBeInTheDocument();
    expect(screen.getByTestId("bookIntroducerName")).toHaveTextContent(
      fakeProps.introducingName
    );
    expect(
      screen.getByTestId("bookIntroducerSeeAllAnchor")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("bookIntroducerSeeAllButton")
    ).toBeInTheDocument();
    const bookHolder = screen.getByTestId("bookIntroducerBooksHolder");
    expect(bookHolder).toBeInTheDocument();
    expect(
      bookHolder.querySelectorAll(`[data-testid='bookCardImageHolder']`).length
    ).toEqual(fakeProps.books.length);
    fakeProps.books.forEach((book) => {
      expect(
        screen.getByTestId(`bookCardHolder_${book.bookId}`)
      ).toBeInTheDocument();
    });
  });
  it("if click on the see more we will move to given url", () => {
    render(<CustomParent {...fakeProps} />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByTestId("bookIntroducerSeeAllAnchor"));
    expect(router.asPath).toEqual(fakeProps.hrefToAllBooks);
  });
});
