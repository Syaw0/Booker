import UserDashBase from "./userDashBase";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import navItems from "src/shared/userDashNavItems";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import router from "next-router-mock";
import { Provider } from "react-redux";
import makeStore from "src/store/userCart/userCart";
import fakeUserCartPageData from "src/shared/fakeUserCartPageData";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return (
    <Provider store={makeStore(fakeUserCartPageData)}>
      <UserDashBase>
        <div data-testid="myChildInTheCustom"></div>
      </UserDashBase>
    </Provider>
  );
};

describe("Test Component", () => {
  it("its render properly", () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    expect(screen.getByTestId("myChildInTheCustom")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseNavbar")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseContent")).toBeInTheDocument();
    navItems.forEach((item) => {
      expect(
        screen.getByTestId(`userDashNavItem_${item.name}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`userDashNavItem_${item.name}`)
      ).toHaveTextContent(item.name);
      fireEvent.click(screen.getByTestId(`userDashNavItemAnchor_${item.name}`));
      expect(router.asPath).toEqual(item.href);
    });
  });
});
