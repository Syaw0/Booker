import UserAddAddressPage from "src/pages/user/addresses/add";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fakeUserAddAddressPageData from "src/shared/fakeUserAddAddressPageData";

jest.mock("db/utils/checkSession", () => jest.fn());
jest.mock("db/utils/getUserById", () => jest.fn());
jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: UserAddAddressPagePropsTypes) => {
  return <UserAddAddressPage {...props} />;
};

describe("Test Page : Add Address", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeUserAddAddressPageData} />);
    expect(screen.getByTestId("userAddAddressPageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("addressModifierHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("userAddAddressPageNoteHolder")
    ).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
  });
});
