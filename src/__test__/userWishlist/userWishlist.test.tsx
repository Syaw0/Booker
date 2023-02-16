import UserWishlistPage from "src/pages/user/wishlist";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fakeUserWishlistPageData from "src/shared/fakeUserWishlistPageData";
import { book1, book2, book3, book4 } from "src/shared/fakeBooks";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: UserWishlistPagePropsTypes) => {
  return <UserWishlistPage {...props} />;
};

const wishList1 = [book1, book2];

const fakeData: UserWishlistPagePropsTypes = {
  ...fakeUserWishlistPageData,
  wishlist: wishList1,
};

const wishList2 = [book1, book2, book3, book4];

const fakeData2: UserWishlistPagePropsTypes = {
  ...fakeUserWishlistPageData,
  wishlist: wishList2,
};

describe("Test Page : User Wishlist", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />);
    expect(screen.getByTestId("userWishlistPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseContent").children.length).toEqual(
      wishList1.length
    );
    wishList1.forEach((book) => {
      expect(
        screen.getByTestId(`bookCardHolder_${book.bookId}`)
      ).toBeInTheDocument();
    });
  });
  it("its render properly test:2", () => {
    render(<CustomParent {...fakeData2} />);
    expect(screen.getByTestId("userWishlistPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseContent").children.length).toEqual(
      wishList2.length
    );
    wishList2.forEach((book) => {
      expect(
        screen.getByTestId(`bookCardHolder_${book.bookId}`)
      ).toBeInTheDocument();
    });
  });
});
