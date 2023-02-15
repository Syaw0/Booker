import OrderIdCard from "./orderIdCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import fakeUserOrderIdPageData from "src/shared/fakeUserOrderIdPageData";
import makeStore from "src/store/userOrderId/userOrderId";

const fakeData: BookCartCardPropsType = {
  author: "leo tolstoy",
  bookId: "2",
  category: "classic",
  description: "",
  image: "/s",
  name: "War and Peace",
  price: "1",
  num: 2,
};

const fakeData2: BookCartCardPropsType = {
  author: "james quick",
  bookId: "3",
  category: "Non-fiction",
  description: "",
  image: "/s",
  name: "limitless",
  price: "3",
  num: 4,
};

const CustomParent = (props: BookCartCardPropsType) => {
  return (
    <Provider store={makeStore(fakeUserOrderIdPageData)}>
      <OrderIdCard {...props} />
    </Provider>
  );
};

describe("Test Component : Order Id Card ", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />);
    expect(
      screen.getByTestId(`OrderIdCard_${fakeData.bookId}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardImage")).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardName")).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardAuthor")).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardTotalPrice")).toBeInTheDocument();

    expect(screen.getByTestId("OrderIdCardTotalPrice")).toHaveTextContent(
      `${Number(fakeData.price) * Number(fakeData.num)}`
    );
    expect(screen.getByTestId("OrderIdCardName")).toHaveTextContent(
      fakeData.name
    );
    expect(screen.getByTestId("OrderIdCardAuthor")).toHaveTextContent(
      fakeData.author
    );
  });

  it("its render properly with other data", () => {
    render(<CustomParent {...fakeData2} />);
    expect(
      screen.getByTestId(`OrderIdCard_${fakeData2.bookId}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardImage")).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardName")).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardAuthor")).toBeInTheDocument();
    expect(screen.getByTestId("OrderIdCardTotalPrice")).toBeInTheDocument();

    expect(screen.getByTestId("OrderIdCardTotalPrice")).toHaveTextContent(
      `${Number(fakeData2.price) * Number(fakeData2.num)}`
    );
    expect(screen.getByTestId("OrderIdCardName")).toHaveTextContent(
      fakeData2.name
    );
    expect(screen.getByTestId("OrderIdCardAuthor")).toHaveTextContent(
      fakeData2.author
    );
  });
});
