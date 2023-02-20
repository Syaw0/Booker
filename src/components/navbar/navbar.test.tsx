import Navbar from "./navbar";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import router from "next-router-mock";
import { Provider } from "react-redux";
import makeStore from "src/store/home/homeStore";
import fakeHomePageData from "src/shared/fakeHomePageData";
import { book1, book2 } from "src/shared/fakeBooks";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: HomePagePropsTypes) => {
  return (
    <Provider store={makeStore(props)}>
      <Navbar />
    </Provider>
  );
};

describe("Test Component : Navbar", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeHomePageData} />);
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
    render(<CustomParent {...fakeHomePageData} />, {
      wrapper: MemoryRouterProvider,
    });
    const logoAnchor = screen.getByTestId("navbarLeftAnchor");
    expect(router.asPath).not.toEqual("/");
    fireEvent.click(logoAnchor);
    expect(router.asPath).toEqual("/");
  });

  it("if we are login click on the cart will move us to user carts", () => {
    render(<CustomParent {...fakeHomePageData} />, {
      wrapper: MemoryRouterProvider,
    });
    const cartIcon = screen.getByTestId("navbarCartIcon");
    expect(router.asPath).not.toEqual("/user/cart");
    fireEvent.click(cartIcon);
    expect(router.asPath).toEqual("/user/cart");
  });

  it("check cart number ", () => {
    const props = fakeHomePageData;
    props.user.cart = ["", "", ""];
    render(<CustomParent {...props} />, {
      wrapper: MemoryRouterProvider,
    });
    expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(
      `${props.user.cart.length}`
    );
  });

  it("if we are login click on the bookmark will move us to user wishlist", () => {
    render(<CustomParent {...fakeHomePageData} />, {
      wrapper: MemoryRouterProvider,
    });
    const cartIcon = screen.getByTestId("navbarBookmarkIcon");
    expect(router.asPath).not.toEqual("/user/wishlist");
    fireEvent.click(cartIcon);
    expect(router.asPath).toEqual("/user/wishlist");
  });

  it("if we are not  login click on the cart will move us to auth page", () => {
    router.replace("/");
    const props = fakeHomePageData;
    props.isLogin = false;
    props.user.cartNumber = 0;
    render(<CustomParent {...props} />, {
      wrapper: MemoryRouterProvider,
    });
    const cartIcon = screen.getByTestId("navbarCartIcon");
    expect(router.asPath).not.toEqual("/auth");
    fireEvent.click(cartIcon);
    expect(router.asPath).toEqual("/auth");
  });

  it("if we are not login click on the bookmark will move us to auth page", () => {
    router.replace("/");
    const props = fakeHomePageData;
    props.isLogin = false;
    props.user.cartNumber = 0;
    render(<CustomParent {...props} />, {
      wrapper: MemoryRouterProvider,
    });
    const cartIcon = screen.getByTestId("navbarBookmarkIcon");
    expect(router.asPath).not.toEqual("/auth");
    fireEvent.click(cartIcon);
    expect(router.asPath).toEqual("/auth");
  });

  it("search something will move us to books route", () => {
    render(<CustomParent {...fakeHomePageData} />, {
      wrapper: MemoryRouterProvider,
    });
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
