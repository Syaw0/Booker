import UserSettingPage from "src/pages/user/setting";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fakeUserSettingPageData from "src/shared/fakeUserSettingPageData";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("db/utils/checkSession", () => jest.fn());
jest.mock("db/utils/getUserById", () => jest.fn());

const CustomParent = (props: UserSettingPagePropsTypes) => {
  return <UserSettingPage {...props} />;
};

describe("Test Page : User Setting", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeUserSettingPageData} />);
    expect(screen.getByTestId("userSettingPage")).toBeInTheDocument();
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    // expect(screen.getByTestId("Information")).toBeInTheDocument();
    // expect(screen.getByTestId("Email And Password")).toBeInTheDocument();
    // expect(screen.getByTestId("Cards")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    expect(screen.getByTestId("oneSectionHolder")).toBeInTheDocument();
  });
});
