import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserOrderIdPage from "src/pages/user/orders/[id]";
import fakeUserOrderIdPageData from "src/shared/fakeUserOrderIdPageData";

jest.mock("db/utils/checkSession", () => jest.fn());
jest.mock("db/utils/getOrder", () => jest.fn());
jest.mock("db/utils/getUserById", () => jest.fn());
jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: UserOrderIdPagePropsTypes) => {
  return <UserOrderIdPage {...props} />;
};

describe("Test Page : User Cart", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeUserOrderIdPageData} />);
    expect(screen.getByTestId("userOrderIdPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    fakeUserOrderIdPageData.order.books.forEach((book) => {
      expect(
        screen.getByTestId(`OrderIdCard_${book.bookId}`)
      ).toBeInTheDocument();
    });

    expect(screen.getByTestId("orderIdSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
  });
});
