import Book from "./book";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "src/store/book/bookStore";
import fakeBookPageData from "src/shared/fakeBookPageData";
import { book1, book2 } from "src/shared/fakeBooks";
import addToCart from "src/utils/addToCart";
import updateUserData from "src/utils/updateUserData";
import bookmarkModifier from "src/utils/bookmarkModifier";
import { fakeUser } from "src/shared/fakeUser";
import { act } from "react-dom/test-utils";

jest.mock("src/utils/addToCart.ts");
jest.mock("src/utils/updateUserData.ts");
jest.mock("src/utils/bookmarkModifier.ts");
jest.mock("next/router", () => require("next-router-mock"));

const mockBookmarkModifier = bookmarkModifier as jest.Mock;
const mockAddToCart = addToCart as jest.Mock;
const mockUpdateUserData = updateUserData as jest.Mock;

const CustomParent = (props: BookPagePropsTypes) => {
  return (
    <Provider store={makeStore(props)}>
      <Book />
    </Provider>
  );
};

describe("Test Component : Book", () => {
  it("its render properly", () => {
    const fakeProps = fakeBookPageData;
    const book = book1;
    fakeProps.book = book;
    render(<CustomParent {...fakeProps} />);
    expect(screen.getByTestId("bookHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookImageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookName")).toBeInTheDocument();
    expect(screen.getByTestId("bookAuthor")).toBeInTheDocument();
    expect(screen.getByTestId("bookDescription")).toBeInTheDocument();
    expect(screen.getByTestId("bookPrice")).toBeInTheDocument();
    expect(screen.getByTestId("bookAddToCartButton")).toBeInTheDocument();

    expect(screen.getByTestId("bookName")).toHaveTextContent(book.name);
    expect(screen.getByTestId("bookAuthor")).toHaveTextContent(book.author);
    expect(screen.getByTestId("bookDescription")).toHaveTextContent(
      book.description
    );
    expect(screen.getByTestId("bookPrice")).toHaveTextContent(`${book.price}$`);
  });
  it("its render properly with other data", () => {
    const fakeProps = fakeBookPageData;
    const book = book2;
    fakeProps.book = book;
    render(<CustomParent {...fakeProps} />);
    expect(screen.getByTestId("bookHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookImageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookName")).toBeInTheDocument();
    expect(screen.getByTestId("bookAuthor")).toBeInTheDocument();
    expect(screen.getByTestId("bookDescription")).toBeInTheDocument();
    expect(screen.getByTestId("bookPrice")).toBeInTheDocument();
    expect(screen.getByTestId("bookAddToCartButton")).toBeInTheDocument();

    expect(screen.getByTestId("bookName")).toHaveTextContent(book.name);
    expect(screen.getByTestId("bookAuthor")).toHaveTextContent(book.author);
    expect(screen.getByTestId("bookDescription")).toHaveTextContent(
      book.description
    );
    expect(screen.getByTestId("bookPrice")).toHaveTextContent(`${book.price}$`);
  });

  it("add book to cart", async () => {
    render(<CustomParent {...fakeBookPageData} />);
    mockAddToCart.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    mockUpdateUserData.mockReturnValue(
      new Promise((res) =>
        res({ status: true, msg: "", data: { ...fakeUser } })
      )
    );

    fireEvent.click(screen.getByTestId("bookAddToCartButton"));
    expect(mockAddToCart).toBeCalledTimes(1);
    await waitFor(() => expect(mockUpdateUserData).toBeCalledTimes(1));
  });

  it("if user has this book in his wish list show fill bookmark", async () => {
    const book = { ...fakeBookPageData.book, bookId: "1" };
    const props: BookPagePropsTypes = {
      ...fakeBookPageData,
      user: { ...fakeUser, wishlist: ["1"] },
      book: book,
    };
    render(<CustomParent {...props} />);
    expect(
      screen.getByTestId("bookPageFilledBookmarkIcon")
    ).toBeInTheDocument();
    let isExist;
    try {
      isExist = expect(
        screen.getByTestId("bookPageBookmarkIcon")
      ).toBeInTheDocument();
    } catch (err) {}
    expect(isExist).toBeUndefined();
  });

  it("if user has not this book in his wish list show empty bookmark", async () => {
    const book = { ...fakeBookPageData.book, bookId: "2" };
    const props: BookPagePropsTypes = {
      ...fakeBookPageData,
      user: { ...fakeUser, wishlist: ["1"] },
      book: book,
    };
    render(<CustomParent {...props} />);
    expect(screen.getByTestId("bookPageBookmarkIcon")).toBeInTheDocument();
    let isExist;
    try {
      isExist = expect(
        screen.getByTestId("bookPageFilledBookmarkIcon")
      ).toBeInTheDocument();
    } catch (err) {}
    expect(isExist).toBeUndefined();
  });

  it("if click on the bookmark...", async () => {
    mockBookmarkModifier.mockReturnValue(
      new Promise((res) =>
        res({ status: true, msg: "", data: { ...fakeUser } })
      )
    );
    const book = { ...fakeBookPageData.book, bookId: "2" };
    const props: BookPagePropsTypes = {
      ...fakeBookPageData,
      user: { ...fakeUser, wishlist: ["1"] },
      book: book,
    };
    render(<CustomParent {...props} />);
    fireEvent.click(screen.getByTestId("bookPageBookmarkIcon"));
    expect(mockBookmarkModifier).toHaveBeenCalledTimes(1);

    await act(async () =>
      fireEvent.click(screen.getByTestId("bookPageBookmarkIcon"))
    );
    // its locked
    expect(mockBookmarkModifier).toHaveBeenCalledTimes(1);
  });
});
