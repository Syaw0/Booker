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
  category: "Bears",
  image: "https://gg.com",
  name: "Momma and the meaning of life",
  price: "10",
  description: "",
};

describe("Test Component : Book", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeBook} />);
    expect(
      screen.getByTestId(`bookCardHolder_${fakeBook.bookId}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("bookCardImageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookCardInformation")).toBeInTheDocument();
    expect(screen.getByTestId("bookCardName")).toBeInTheDocument();
    expect(screen.getByTestId("bookCardAuthor")).toBeInTheDocument();

    expect(screen.getByTestId("bookCardName")).toHaveTextContent(fakeBook.name);
    expect(screen.getByTestId("bookCardAuthor")).toHaveTextContent(
      fakeBook.author
    );
  });

  it("if click on the cart we will move to the book page", () => {
    render(<CustomParent {...fakeBook} />, { wrapper: MemoryRouterProvider });
    const book = screen.getByTestId(`bookCardAnchor_${fakeBook.bookId}`);
    fireEvent.click(book);
    expect(router.asPath).toEqual(
      `/book/${fakeBook.category}/${fakeBook.bookId}`
    );
  });
});
