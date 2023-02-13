import Navbar from "./navbar";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import router from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return <Navbar />;
};

describe("Test Component : Navbar", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("navbarLeft")).toBeInTheDocument();
    expect(screen.getByTestId("navbarRight")).toBeInTheDocument();
    expect(screen.getByTestId("navbarMiddle")).toBeInTheDocument();
    expect(screen.getByTestId("navbarLeftAnchor")).toBeInTheDocument();
    expect(screen.getByTestId("navbarSearchInput")).toBeInTheDocument();
    expect(screen.getByTestId("navbarSearchInputIcon")).toBeInTheDocument();
    expect(screen.getByTestId("navbarSearchIcon")).toBeInTheDocument();
    expect(screen.getByTestId("navbarBookmarkIcon")).toBeInTheDocument();
    expect(screen.getByTestId("navbarCartIcon")).toBeInTheDocument();
    expect(screen.getByTestId("navbarCartNumber")).toBeInTheDocument();
    expect(screen.getByTestId("navbarProfile")).toBeInTheDocument();
  });
  it("click on the main logo will move us to home page", () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    const logoAnchor = screen.getByTestId("navbarLeftAnchor");
    expect(router.asPath).not.toEqual("/");
    fireEvent.click(logoAnchor);
    expect(router.asPath).toEqual("/");
  });

  it("click on the cart will move us to user carts", () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    const cartIcon = screen.getByTestId("navbarCartIcon");
    expect(router.asPath).not.toEqual("/user/cart");
    fireEvent.click(cartIcon);
    expect(router.asPath).toEqual("/user/cart");
  });

  it("click on the bookmark will move us to user wishlist", () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    const cartIcon = screen.getByTestId("navbarBookmarkIcon");
    expect(router.asPath).not.toEqual("/user/wishlist");
    fireEvent.click(cartIcon);
    expect(router.asPath).toEqual("/user/wishlist");
  });

  it("search something will move us to books route", () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    const searchInput = screen.getByTestId("navbarSearchInput");
    const searchInputIcon = screen.getByTestId("navbarSearchInputIcon");
    expect(router.asPath).not.toEqual("/books?q=someQuery");

    fireEvent.change(searchInput, { target: { value: "someQuery" } });
    fireEvent.keyDown(searchInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(router.asPath).toEqual("/books?q=someQuery");
    fireEvent.change(searchInput, { target: { value: "otherQuery" } });
    fireEvent.click(searchInputIcon);
    expect(router.asPath).toEqual("/books?q=otherQuery");
  });
});
