import UserCartPage from "src/pages/user/cart";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import pay from "src/utils/pay";
import addOneToCart from "src/utils/addToCart";
import removeAllFromCart from "src/utils/removeAllFromCart";
import removeOneFromCart from "src/utils/removeOneFromCart";
import updateCartData from "src/utils/updateCardData";
import fakeUserCartPageData from "src/shared/fakeUserCartPageData";
import { book1 } from "src/shared/fakeBooks";
import { act } from "react-dom/test-utils";

jest.mock("server/graphql/utils/getCartData", () => jest.fn());
jest.mock("db/utils/checkSession", () => jest.fn());
jest.mock("db/utils/getAddresses", () => jest.fn());
jest.mock("db/utils/getUserById", () => jest.fn());

jest.mock("src/utils/addToCart.ts");
jest.mock("src/utils/updateCardData.ts");

jest.mock("src/utils/removeAllFromCart");
jest.mock("src/utils/removeOneFromCart");
jest.mock("src/utils/pay");
jest.mock("next/router", () => require("next-router-mock"));

const mockAddOneToCart = addOneToCart as jest.Mock;
const mockRemoveAllFromCart = removeAllFromCart as jest.Mock;
const mockRemoveOneFromCart = removeOneFromCart as jest.Mock;
const mockUpdateCartData = updateCartData as jest.Mock;
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
    fakeData.user.cart = ["", ""];

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
      new Promise((res) => res({ status: true, msg: "" }))
    );
    mockUpdateCartData.mockReturnValue(
      new Promise((res) =>
        res({
          status: true,
          msg: "",
          data: {
            user: { cartNumber: num + 1, cart: ["", "", ""] },
            books: [{ ...book, num: num + 1 }],
            priceSummary: { ...fakeUserCartPageData.priceSummary },
            addresses: [...fakeUserCartPageData.addresses],
          },
        })
      )
    );
    fireEvent.click(addButton);
    expect(mockAddOneToCart).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(mockUpdateCartData).toBeCalledTimes(1));
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
    fakeData.user.cart = ["", ""];

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
      new Promise((res) => res({ status: true, msg: "" }))
    );
    mockUpdateCartData.mockReturnValue(
      new Promise((res) =>
        res({
          status: true,
          msg: "",
          data: {
            user: { cartNumber: num - 1, cart: [""] },
            books: [{ ...book, num: num - 1 }],
            priceSummary: { ...fakeUserCartPageData.priceSummary },
            addresses: [...fakeUserCartPageData.addresses],
          },
        })
      )
    );
    await act(async () => fireEvent.click(subButton));
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
    fakeData.user.cart = ["", ""];

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
      new Promise((res) => res({ status: true, msg: "" }))
    );
    mockUpdateCartData.mockReturnValue(
      new Promise((res) =>
        res({
          status: true,
          msg: "",
          data: {
            user: { cartNumber: 0, cart: [] },
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
