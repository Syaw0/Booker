import OrderCart from "./orderCart";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import router from "next-router-mock";
import { book1, book2, book3, book4 } from "src/shared/fakeBooks";
import { address1 } from "src/shared/fakeAddresses";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: Order) => {
  return <OrderCart {...props} />;
};

const fakeData1: Order = {
  books: [book1, book2, book3, book4, book1],
  date: "some date",
  orderId: "2",
  state: "delivered",
  priceSummary: {
    total: "1",
    shipping: "1",
    subTotal: "1",
    tax: "1",
  },
  address: address1,
};

const fakeData2: Order = {
  books: [book1, book2, book3, book4, book1],
  date: "some date",
  orderId: "2",
  state: "delivered",
  priceSummary: {
    total: "1",
    shipping: "1",
    subTotal: "1",
    tax: "1",
  },
  address: address1,
};

describe("Test Component", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData1} />);
    expect(screen.getByTestId(`order_${fakeData1.orderId}`));
    expect(screen.getByTestId("orderOrderId")).toBeInTheDocument();
    expect(screen.getByTestId("orderDate")).toBeInTheDocument();
    expect(screen.getByTestId("orderState")).toBeInTheDocument();
    expect(screen.getByTestId("orderTotalPrice")).toBeInTheDocument();
    expect(screen.getByTestId("orderRestBookNumber")).toBeInTheDocument();
    expect(screen.getByTestId("orderSeeDetailButton")).toBeInTheDocument();

    fakeData1.books.forEach((book, i) => {
      if (i > 3) {
        let isExist;
        try {
          isExist = screen.getByTestId(`orderImage_${i}`);
        } catch (err) {}
        expect(isExist).toBeUndefined();
      } else {
        expect(screen.getByTestId(`orderImage_${i}`)).toBeInTheDocument();
      }
    });

    expect(screen.getByTestId("orderOrderId")).toHaveTextContent(
      fakeData1.orderId
    );
    expect(screen.getByTestId("orderDate")).toHaveTextContent(fakeData1.date);
    expect(screen.getByTestId("orderState")).toHaveTextContent(fakeData1.state);
    expect(screen.getByTestId("orderTotalPrice")).toHaveTextContent(
      `${fakeData1.priceSummary.total}`
    );
    expect(screen.getByTestId("orderRestBookNumber")).toHaveTextContent(
      fakeData1.books.length - 4 <= 0
        ? ""
        : `And +${fakeData1.books.length - 4} books`
    );
  });

  it("its render properly with other data", () => {
    render(<CustomParent {...fakeData2} />);
    expect(screen.getByTestId(`order_${fakeData2.orderId}`));
    expect(screen.getByTestId("orderOrderId")).toBeInTheDocument();
    expect(screen.getByTestId("orderDate")).toBeInTheDocument();
    expect(screen.getByTestId("orderState")).toBeInTheDocument();
    expect(screen.getByTestId("orderTotalPrice")).toBeInTheDocument();
    expect(screen.getByTestId("orderRestBookNumber")).toBeInTheDocument();
    expect(screen.getByTestId("orderSeeDetailButton")).toBeInTheDocument();

    fakeData2.books.forEach((book, i) => {
      if (i > 3) {
        let isExist;
        try {
          isExist = screen.getByTestId(`orderImage_${i}`);
        } catch (err) {}
        expect(isExist).toBeUndefined();
      } else {
        expect(screen.getByTestId(`orderImage_${i}`)).toBeInTheDocument();
      }
    });

    expect(screen.getByTestId("orderOrderId")).toHaveTextContent(
      fakeData2.orderId
    );
    expect(screen.getByTestId("orderDate")).toHaveTextContent(fakeData2.date);
    expect(screen.getByTestId("orderState")).toHaveTextContent(fakeData2.state);
    expect(screen.getByTestId("orderTotalPrice")).toHaveTextContent(
      `${fakeData2.priceSummary.total}`
    );
    expect(screen.getByTestId("orderRestBookNumber")).toHaveTextContent(
      fakeData2.books.length - 4 <= 0
        ? ""
        : `And +${fakeData2.books.length - 4} books`
    );
  });
  it("if click on the see detail we moved to user/orders/id page", () => {
    render(<CustomParent {...fakeData2} />);
    const button = screen.getByTestId("orderSeeDetailButton");
    fireEvent.click(button);
    expect(router.asPath).toEqual(`/user/orders/${fakeData2.orderId}`);
  });

  it("if click on the see detail we moved to user/orders/id page test2", () => {
    render(<CustomParent {...fakeData1} />);
    const button = screen.getByTestId("orderSeeDetailButton");
    fireEvent.click(button);
    expect(router.asPath).toEqual(`/user/orders/${fakeData1.orderId}`);
  });
});
