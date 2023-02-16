import UserAddressesPage from "src/pages/user/addresses";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import fakeUserAddressesPageData from "src/shared/fakeUserAddressesPageData";
import { address1, address2, address3 } from "src/shared/fakeAddresses";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import router from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: UserAddressesPagePropsTypes) => {
  return <UserAddressesPage {...props} />;
};

const addresses = [address1, address2];
const addresses2 = [address1, address2, address3];

const fakeData: UserAddressesPagePropsTypes = {
  ...fakeUserAddressesPageData,
  addresses: addresses,
};
const fakeData2: UserAddressesPagePropsTypes = {
  ...fakeUserAddressesPageData,
  addresses: addresses2,
};

describe("Test Page : User Addresses", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />);
    expect(screen.getByTestId("userAddressesPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("userAddressesAddAddressButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();

    expect(
      screen
        .getByTestId("userDashBaseContent")
        .querySelectorAll('[data-testid="addressCardTitle"]').length
    ).toEqual(addresses.length);
    addresses.forEach((add) => {
      expect(
        screen.getByTestId(`addressCard_${add.title}`)
      ).toBeInTheDocument();
    });
  });

  it("its render properly test:2", () => {
    render(<CustomParent {...fakeData2} />);
    expect(screen.getByTestId("userAddressesPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("userAddressesAddAddressButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();

    expect(
      screen
        .getByTestId("userDashBaseContent")
        .querySelectorAll('[data-testid="addressCardTitle"]').length
    ).toEqual(addresses2.length);
    addresses2.forEach((add) => {
      expect(
        screen.getByTestId(`addressCard_${add.title}`)
      ).toBeInTheDocument();
    });
  });
  it("click on the add address will move us to add address page", () => {
    render(<CustomParent {...fakeData2} />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByTestId("userAddressesAddAddressButton"));
    expect(router.asPath).toEqual("/user/addresses/addAddress");
  });
});
