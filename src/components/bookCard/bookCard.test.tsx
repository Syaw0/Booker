import BookCard from "./bookCard";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import router from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (params: BookCardPropsType) => <BookCard {...params} />;

const fakeBook: BookCardPropsType = {
  author: "Irvin Yalom",
  bookId: "2",
  category: "psychology",
  image: "https://gg.com",
  name: "Momma and the meaning of life",
  price: "10",
};

describe("Test Component : Book", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeBook} />);
    expect(
      screen.getByTestId(`bookCartHolder_${fakeBook.bookId}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("bookCartImageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookCartInformation")).toBeInTheDocument();
    expect(screen.getByTestId("bookCartName")).toBeInTheDocument();
    expect(screen.getByTestId("bookCartAuthor")).toBeInTheDocument();

    expect(screen.getByTestId("bookCartName")).toHaveTextContent(fakeBook.name);
    expect(screen.getByTestId("bookCartAuthor")).toHaveTextContent(
      fakeBook.author
    );
  });

  it("if click on the cart we will move to the book page", () => {
    render(<CustomParent {...fakeBook} />, { wrapper: MemoryRouterProvider });
    const book = screen.getByTestId(`bookCartHolder_${fakeBook.bookId}`);
    fireEvent.click(book);
    expect(router.asPath).toEqual(
      `/book/${fakeBook.category}/${fakeBook.bookId}`
    );
  });
});
