import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserEditAddressPage from "src/pages/user/addresses/edit";
import fakeUserEditAddressPageData from "src/shared/fakeUseEditAddressPageData";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: UserEditAddressPagePropsTypes) => {
  return <UserEditAddressPage {...props} />;
};

describe("Test Page : Edit Address", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeUserEditAddressPageData} />);
    expect(screen.getByTestId("userEditAddressPageHolder")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("addressModifierHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("userEditAddressPageNoteHolder")
    ).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
  });
});
