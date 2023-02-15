import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { address1, address2 } from "src/shared/fakeAddresses";
import OrderIdSummary from "./orderIdSummary";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("src/utils/pay.ts");

type CartPriceSummaryPropsType = Pick<
  UserCartPagePropsTypes,
  "priceSummary"
> & { address: Address };

const fakeData: CartPriceSummaryPropsType = {
  priceSummary: {
    shipping: 2,
    subTotal: 2,
    tax: 2,
    total: 6,
  },
  address: address1,
};
const fakeData2: CartPriceSummaryPropsType = {
  priceSummary: {
    shipping: 3,
    subTotal: 4,
    tax: 5,
    total: 12,
  },
  address: address2,
};

const CustomParent = (props: CartPriceSummaryPropsType) => {
  return <OrderIdSummary {...props} />;
};

describe("Test Component : Order Id Summary", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />);
    expect(screen.getByTestId("orderIdSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummarySubTotal")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummaryTax")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummaryShipping")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummaryTotal")).toBeInTheDocument();

    expect(screen.getByTestId("orderIdSummarySubTotal")).toHaveTextContent(
      `${fakeData.priceSummary.subTotal}`
    );
    expect(screen.getByTestId("orderIdSummaryTax")).toHaveTextContent(
      `${fakeData.priceSummary.tax}`
    );
    expect(screen.getByTestId("orderIdSummaryShipping")).toHaveTextContent(
      `${fakeData.priceSummary.shipping}`
    );
    expect(screen.getByTestId("orderIdSummaryTotal")).toHaveTextContent(
      `${fakeData.priceSummary.total}`
    );
    expect(screen.getByTestId("orderIdSummaryReceiverName")).toHaveTextContent(
      `${fakeData.address.receiverName}`
    );

    expect(screen.getByTestId("orderIdSummaryCountry")).toHaveTextContent(
      `${fakeData.address.country}`
    );

    expect(screen.getByTestId("orderIdSummaryCity")).toHaveTextContent(
      `${fakeData.address.city}`
    );

    expect(screen.getByTestId("orderIdSummaryState")).toHaveTextContent(
      `${fakeData.address.state}`
    );
    expect(screen.getByTestId("orderIdSummaryStreet")).toHaveTextContent(
      `${fakeData.address.street}`
    );
    expect(screen.getByTestId("orderIdSummaryTel")).toHaveTextContent(
      `${fakeData.address.tel}`
    );
    expect(screen.getByTestId("orderIdSummaryZipCode")).toHaveTextContent(
      `${fakeData.address.zipCode}`
    );
  });

  it("its render properly with other data", () => {
    render(<CustomParent {...fakeData2} />);
    expect(screen.getByTestId("orderIdSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummarySubTotal")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummaryTax")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummaryShipping")).toBeInTheDocument();
    expect(screen.getByTestId("orderIdSummaryTotal")).toBeInTheDocument();

    expect(screen.getByTestId("orderIdSummarySubTotal")).toHaveTextContent(
      `${fakeData2.priceSummary.subTotal}`
    );
    expect(screen.getByTestId("orderIdSummaryTax")).toHaveTextContent(
      `${fakeData2.priceSummary.tax}`
    );
    expect(screen.getByTestId("orderIdSummaryShipping")).toHaveTextContent(
      `${fakeData2.priceSummary.shipping}`
    );
    expect(screen.getByTestId("orderIdSummaryTotal")).toHaveTextContent(
      `${fakeData2.priceSummary.total}`
    );
    expect(screen.getByTestId("orderIdSummaryReceiverName")).toHaveTextContent(
      `${fakeData2.address.receiverName}`
    );

    expect(screen.getByTestId("orderIdSummaryCountry")).toHaveTextContent(
      `${fakeData2.address.country}`
    );

    expect(screen.getByTestId("orderIdSummaryCity")).toHaveTextContent(
      `${fakeData2.address.city}`
    );

    expect(screen.getByTestId("orderIdSummaryState")).toHaveTextContent(
      `${fakeData2.address.state}`
    );
    expect(screen.getByTestId("orderIdSummaryStreet")).toHaveTextContent(
      `${fakeData2.address.street}`
    );
    expect(screen.getByTestId("orderIdSummaryTel")).toHaveTextContent(
      `${fakeData2.address.tel}`
    );
    expect(screen.getByTestId("orderIdSummaryZipCode")).toHaveTextContent(
      `${fakeData2.address.zipCode}`
    );
  });
});
