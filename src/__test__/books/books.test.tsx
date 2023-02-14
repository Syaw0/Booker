import BooksPage from "src/pages/books";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fakeBooksPageData from "src/shared/fakeBooksPageData";
import getFilteredBooks from "src/utils/getFilteredBooks";
import { book3, book4 } from "src/shared/fakeBooks";

jest.mock("src/utils/getFilteredBooks.ts");
jest.mock("next/router", () => require("next-router-mock"));

const mockGetFilteredBooks = getFilteredBooks as jest.Mock;
const CustomParent = (props: BooksPagePropsTypes) => {
  return <BooksPage {...props} />;
};

describe("Test Page : Books", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeBooksPageData} />);
    expect(screen.getByTestId("booksPageHolder")).toBeInTheDocument();
    expect(screen.getAllByTestId("booksFilterHolder").length).toBeGreaterThan(
      1
    );
    expect(screen.getByTestId("booksPageBookHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    fakeBooksPageData.books.forEach((book) => {
      expect(
        screen.getByTestId(`bookCardHolder_${book.bookId}`)
      ).toBeInTheDocument();
    });
  });

  it("if we choose filter and click on the apply books came back from server show it in the books holder", () => {
    render(<CustomParent {...fakeBooksPageData} />);
    const books = [book4, book3];
    mockGetFilteredBooks.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: books }))
    );
    fireEvent.click(screen.getAllByTestId("booksFilterApplyFilterButton")[0]);
    books.forEach(async (book) => {
      await waitFor(() =>
        expect(
          screen.getByTestId(`bookCardHolder_${book.bookId}`)
        ).toBeInTheDocument()
      );
    });
  });
});
