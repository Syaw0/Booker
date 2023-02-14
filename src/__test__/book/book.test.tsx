import BookPage from "src/pages/book/[category]/[id]";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fakeBookPageData from "src/shared/fakeBookPageData";
import addToCart from "src/utils/addToCart";
import updateUserData from "src/utils/updateUserData";

jest.mock("src/utils/addToCart.ts");
jest.mock("src/utils/updateUserData.ts");
jest.mock("next/router", () => require("next-router-mock"));

const mockAddToCart = addToCart as jest.Mock;
const mockUpdateUserData = updateUserData as jest.Mock;

const CustomParent = (props: BookPagePropsTypes) => {
  return <BookPage {...props} />;
};

describe("Test Page : Book", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeBookPageData} />);
    expect(screen.getByTestId("bookPageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    expect(screen.getByTestId("bookPageIntroducer")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        `bookIntroducer_${fakeBookPageData.booksIntroducers.similar.introducingName}`
      )
    ).toBeInTheDocument();
  });

  it("add to cart and see navbar cart icon number", async () => {
    render(<CustomParent {...fakeBookPageData} />);
    const fakeUserData = { ...fakeBookPageData.user };
    fakeUserData.cartNumber = Number(fakeUserData.cartNumber) + 1;
    mockAddToCart.mockReturnValue(new Promise((res) => res({ status: true })));
    mockUpdateUserData.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: fakeUserData }))
    );
    expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(
      `${fakeBookPageData.user.cartNumber}`
    );
    fireEvent.click(screen.getByTestId("bookAddToCartButton"));
    await waitFor(() =>
      expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(
        `${fakeUserData.cartNumber}`
      )
    );
  });
});
