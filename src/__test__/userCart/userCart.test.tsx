import UserCartPage from "src/pages/user/cart";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import pay from "src/utils/pay";
import addOneToCart from "src/utils/addOneToCart";
import removeAllFromCart from "src/utils/removeAllFromCart";
import removeOneFromCart from "src/utils/removeOneFromCart";
import fakeUserCartPageData from "src/shared/fakeUserCartPageData";
import { book1 } from "src/shared/fakeBooks";

jest.mock("src/utils/addOneToCart");
jest.mock("src/utils/removeAllFromCart");
jest.mock("src/utils/removeOneFromCart");
jest.mock("src/utils/pay");
jest.mock("next/router", () => require("next-router-mock"));

const mockAddOneToCart = addOneToCart as jest.Mock;
const mockRemoveAllFromCart = removeAllFromCart as jest.Mock;
const mockRemoveOneFromCart = removeOneFromCart as jest.Mock;
const mockPay = pay as jest.Mock;

const CustomParent = (props: UserCartPagePropsTypes) => {
  return <UserCartPage {...props} />;
};

describe("Test Page : User Cart", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeUserCartPageData} />);
    expect(screen.getByTestId("userCartPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    fakeUserCartPageData.books.forEach((book) => {
      expect(
        screen.getByTestId(`cartCardHolder_${book.bookId}`)
      ).toBeInTheDocument();
    });

    expect(screen.getByTestId("cartPriceSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
  });

  it("add one to book and see result", async () => {
    const fakeData = { ...fakeUserCartPageData };
    const num = 2;
    const book = { ...book1, num: num };
    fakeData.books = [book];
    fakeData.user.cartNumber = 2;

    render(<CustomParent {...fakeUserCartPageData} />);

    expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(`${num}`);
    const addButton = screen
      .getByTestId(`cartCardHolder_${book.bookId}`)
      .querySelector('[data-testid="cartCardAddOneButton"]') as HTMLElement;

    const count = screen
      .getByTestId(`cartCardHolder_${book.bookId}`)
      .querySelector(
        '[data-testid="cartCardCountNumber"]'
      ) as HTMLParagraphElement;
    expect(count).toHaveTextContent(`${num}`);

    mockAddOneToCart.mockReturnValue(
      new Promise((res) =>
        res({
          status: true,
          msg: "",
          data: {
            user: { cartNumber: num + 1 },
            books: [{ ...book, num: num + 1 }],
            priceSummary: { ...fakeUserCartPageData.priceSummary },
            addresses: [...fakeUserCartPageData.addresses],
          },
        })
      )
    );
    fireEvent.click(addButton);
    expect(mockAddOneToCart).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(
        `${num + 1}`
      )
    );
    await waitFor(() => expect(count).toHaveTextContent(`${num + 1}`));
  });

  it("remove one from book number and see result", async () => {
    const fakeData = { ...fakeUserCartPageData };
    const num = 2;
    const book = { ...book1, num: num };
    fakeData.books = [book];
    fakeData.user.cartNumber = 2;

    render(<CustomParent {...fakeUserCartPageData} />);

    expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(`${num}`);
    const subButton = screen
      .getByTestId(`cartCardHolder_${book.bookId}`)
      .querySelector('[data-testid="cartCardRemoveOneButton"]') as HTMLElement;

    const count = screen
      .getByTestId(`cartCardHolder_${book.bookId}`)
      .querySelector(
        '[data-testid="cartCardCountNumber"]'
      ) as HTMLParagraphElement;
    expect(count).toHaveTextContent(`${num}`);

    mockRemoveOneFromCart.mockReturnValue(
      new Promise((res) =>
        res({
          status: true,
          msg: "",
          data: {
            user: { cartNumber: num - 1 },
            books: [{ ...book, num: num - 1 }],
            priceSummary: { ...fakeUserCartPageData.priceSummary },
            addresses: [...fakeUserCartPageData.addresses],
          },
        })
      )
    );
    fireEvent.click(subButton);
    expect(mockRemoveOneFromCart).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(
        `${num - 1}`
      )
    );
    await waitFor(() => expect(count).toHaveTextContent(`${num - 1}`));
  });

  it("remove All  book number and see result", async () => {
    const fakeData = { ...fakeUserCartPageData };
    const num = 2;
    const book = { ...book1, num: num };
    fakeData.books = [book];
    fakeData.user.cartNumber = 2;

    render(<CustomParent {...fakeUserCartPageData} />);

    expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(`${num}`);
    const subButton = screen
      .getByTestId(`cartCardHolder_${book.bookId}`)
      .querySelector('[data-testid="cartCardRemoveAllButton"]') as HTMLElement;

    const count = screen
      .getByTestId(`cartCardHolder_${book.bookId}`)
      .querySelector(
        '[data-testid="cartCardCountNumber"]'
      ) as HTMLParagraphElement;
    expect(count).toHaveTextContent(`${num}`);

    mockRemoveAllFromCart.mockReturnValue(
      new Promise((res) =>
        res({
          status: true,
          msg: "",
          data: {
            user: { cartNumber: 0 },
            books: [],
            priceSummary: { ...fakeUserCartPageData.priceSummary },
            addresses: [...fakeUserCartPageData.addresses],
          },
        })
      )
    );
    fireEvent.click(subButton);
    expect(mockRemoveAllFromCart).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("navbarCartNumber")).toHaveTextContent(`${0}`)
    );
    await waitFor(() => expect(count).not.toBeInTheDocument());
  });
});
