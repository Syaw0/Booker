import CartCard from "./cartCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "src/store/userCart/userCart";
import fakeUserCartPageData from "src/shared/fakeUserCartPageData";
import addOneToCart from "src/utils/addToCart";
import removeOneFromCart from "src/utils/removeOneFromCart";
import removeAllFromCart from "src/utils/removeAllFromCart";
import { act } from "react-dom/test-utils";
import categories from "src/shared/allCategories";

jest.mock("src/utils/addToCart.ts");
jest.mock("src/utils/removeOneFromCart.ts");
jest.mock("src/utils/removeAllFromCart.ts");

const mockAddOneToCart = addOneToCart as jest.Mock;
const mockRemoveOneFromCart = removeOneFromCart as jest.Mock;
const mockRemoveAllFromCart = removeAllFromCart as jest.Mock;

const fakeData: BookCartCardPropsType = {
  author: "leo tolstoy",
  bookId: "2",
  category: categories[0],
  description: "",
  image: "/s",
  name: "War and Peace",
  price: "1",
  num: 2,
};

const fakeData2: BookCartCardPropsType = {
  author: "james quick",
  bookId: "3",
  category: categories[0],
  description: "",
  image: "/s",
  name: "limitless",
  price: "3",
  num: 4,
};

const CustomParent = (props: BookCartCardPropsType) => {
  return (
    <Provider store={makeStore(fakeUserCartPageData)}>
      <CartCard {...props} />
    </Provider>
  );
};

describe("Test Component : CartCard ", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />);
    expect(
      screen.getByTestId(`cartCardHolder_${fakeData.bookId}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("cartCardImage")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardName")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardAuthor")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardCountNumber")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardRemoveAllButton")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardAddOneButton")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardTotalPrice")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardRemoveOneButton")).toBeInTheDocument();

    expect(screen.getByTestId("cartCardTotalPrice")).toHaveTextContent(
      `${Number(fakeData.price) * Number(fakeData.num)}`
    );
    expect(screen.getByTestId("cartCardName")).toHaveTextContent(fakeData.name);
    expect(screen.getByTestId("cartCardAuthor")).toHaveTextContent(
      fakeData.author
    );
    expect(screen.getByTestId("cartCardCountNumber")).toHaveTextContent(
      `${fakeData.num}`
    );
  });

  it("its render properly with other data", () => {
    render(<CustomParent {...fakeData2} />);
    expect(
      screen.getByTestId(`cartCardHolder_${fakeData2.bookId}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("cartCardImage")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardName")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardAuthor")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardCountNumber")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardRemoveAllButton")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardAddOneButton")).toBeInTheDocument();
    expect(screen.getByTestId("cartCardTotalPrice")).toBeInTheDocument();

    expect(screen.getByTestId("cartCardTotalPrice")).toHaveTextContent(
      `${Number(fakeData2.price) * Number(fakeData2.num)}`
    );
    expect(screen.getByTestId("cartCardName")).toHaveTextContent(
      fakeData2.name
    );
    expect(screen.getByTestId("cartCardAuthor")).toHaveTextContent(
      fakeData2.author
    );
    expect(screen.getByTestId("cartCardCountNumber")).toHaveTextContent(
      `${fakeData2.num}`
    );
  });

  it("click on the add one button", async () => {
    mockAddOneToCart.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "", data: fakeUserCartPageData })
      )
    );
    render(<CustomParent {...fakeData} />);
    const addButton = screen.getByTestId("cartCardAddOneButton");
    fireEvent.click(addButton);
    expect(mockAddOneToCart).toBeCalledTimes(1);
    await act(async () => fireEvent.click(addButton));
    // freeze until response came back
    expect(mockAddOneToCart).toBeCalledTimes(1);
  });

  it("click on the remove one button", async () => {
    mockRemoveOneFromCart.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "", data: fakeUserCartPageData })
      )
    );
    render(<CustomParent {...fakeData} />);
    const rmOneButton = screen.getByTestId("cartCardRemoveOneButton");
    fireEvent.click(rmOneButton);
    expect(mockRemoveOneFromCart).toBeCalledTimes(1);
    await act(async () => fireEvent.click(rmOneButton));
    // freeze until response came back
    expect(mockRemoveOneFromCart).toBeCalledTimes(1);
  });

  it("click on the remove all button", async () => {
    mockRemoveAllFromCart.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "", data: fakeUserCartPageData })
      )
    );
    render(<CustomParent {...fakeData} />);
    const rmAllButton = screen.getByTestId("cartCardRemoveAllButton");
    fireEvent.click(rmAllButton);
    expect(mockRemoveAllFromCart).toBeCalledTimes(1);
    await act(async () => fireEvent.click(rmAllButton));
    // freeze until response came back
    expect(mockRemoveAllFromCart).toBeCalledTimes(1);
  });
});
