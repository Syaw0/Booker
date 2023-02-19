import CartPriceSummary from "./cartPriceSummary";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { address1, address2 } from "src/shared/fakeAddresses";
import pay from "src/utils/pay";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import router from "next-router-mock";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import makeStore from "src/store/userCart/userCart";
import fakeUserCartPageData from "src/shared/fakeUserCartPageData";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("src/utils/pay.ts");

const mockPay = pay as jest.Mock;

type CartPriceSummaryPropsType = Pick<
  UserCartPagePropsTypes,
  "addresses" | "priceSummary"
>;

const fakeData: CartPriceSummaryPropsType = {
  addresses: [address1, address2],
  priceSummary: {
    shipping: 2,
    subTotal: 2,
    tax: 2,
    total: 6,
  },
};
const fakeData2: CartPriceSummaryPropsType = {
  addresses: [],
  priceSummary: {
    shipping: 3,
    subTotal: 4,
    tax: 5,
    total: 12,
  },
};

const CustomParent = (props: CartPriceSummaryPropsType) => {
  return (
    <Provider store={makeStore({ ...fakeUserCartPageData, ...props })}>
      <CartPriceSummary {...props} />
    </Provider>
  );
};

describe("Test Component : CartPriceSummary", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />);
    expect(screen.getByTestId("cartPriceSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummarySubTotal")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryTax")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryShipping")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryTotal")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummarySelect")).toBeInTheDocument();
    expect(
      screen.getByTestId("cartPriceSummaryAddNewAddressButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryPayButton")).toBeInTheDocument();
    fakeData.addresses.forEach((add) => {
      expect(
        screen.getByTestId(`cartSelectSummaryAddress_${add.title}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`cartSelectSummaryAddress_${add.title}`)
      ).toHaveTextContent(add.title);
    });

    expect(screen.getByTestId("cartPriceSummarySubTotal")).toHaveTextContent(
      `${fakeData.priceSummary.subTotal}`
    );
    expect(screen.getByTestId("cartPriceSummaryTax")).toHaveTextContent(
      `${fakeData.priceSummary.tax}`
    );
    expect(screen.getByTestId("cartPriceSummaryShipping")).toHaveTextContent(
      `${fakeData.priceSummary.shipping}`
    );
    expect(screen.getByTestId("cartPriceSummaryTotal")).toHaveTextContent(
      `${fakeData.priceSummary.total}`
    );
  });

  it("its render properly with other data", () => {
    render(<CustomParent {...fakeData2} />);
    expect(screen.getByTestId("cartPriceSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummarySubTotal")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryTax")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryShipping")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryTotal")).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummarySelect")).toBeInTheDocument();
    expect(
      screen.getByTestId("cartPriceSummaryAddNewAddressButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("cartPriceSummaryPayButton")).toBeInTheDocument();
    fakeData2.addresses.forEach((add) => {
      expect(
        screen.getByTestId(`cartSelectSummaryAddress_${add.title}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`cartSelectSummaryAddress_${add.title}`)
      ).toHaveTextContent(add.title);
    });

    expect(screen.getByTestId("cartPriceSummarySubTotal")).toHaveTextContent(
      `${fakeData2.priceSummary.subTotal}`
    );
    expect(screen.getByTestId("cartPriceSummaryTax")).toHaveTextContent(
      `${fakeData2.priceSummary.tax}`
    );
    expect(screen.getByTestId("cartPriceSummaryShipping")).toHaveTextContent(
      `${fakeData2.priceSummary.shipping}`
    );
    expect(screen.getByTestId("cartPriceSummaryTotal")).toHaveTextContent(
      `${fakeData2.priceSummary.total}`
    );
  });

  it("if address was empty show error when clicked on pay", () => {
    render(<CustomParent {...fakeData2} />);
    expect(
      screen.getByTestId("cartPriceSummarySelect").children.length
    ).toEqual(1); // empty
    const button = screen.getByTestId("cartPriceSummaryPayButton");
    fireEvent.click(button);
    expect(mockPay).toBeCalledTimes(0);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "You must add an Address!"
    );
  });
  it("choose address and pay", async () => {
    render(<CustomParent {...fakeData} />, { wrapper: MemoryRouterProvider });
    mockPay.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error" }))
    );
    mockPay.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "okay", data: { orderId: "1" } })
      )
    );
    fireEvent.change(screen.getByTestId("cartPriceSummarySelect"), {
      target: { value: fakeData.addresses[0].addressId },
    });
    const button = screen.getByTestId("cartPriceSummaryPayButton");
    fireEvent.click(button);
    expect(mockPay).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toHaveTextContent("error")
    );

    await act(async () => fireEvent.click(button));
    expect(mockPay).toBeCalledTimes(2);

    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toHaveTextContent("okay")
    );
    await waitFor(() => expect(router.asPath).toEqual("/user/orders/1"));
  });
  it("click on the add address will move us to the user/addresses page", async () => {
    render(<CustomParent {...fakeData} />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByTestId("cartPriceSummaryAddNewAddressButton"));
    expect(router.asPath).toEqual("/user/addresses");
  });
});
