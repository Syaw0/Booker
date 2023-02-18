import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import UserOrdersPage from "src/pages/user/orders";
import router from "next-router-mock";
import { fakeOrder1, fakeOrder2, fakeOrder3 } from "src/shared/fakeOrders";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider/next-11";
import { fakeUser } from "src/shared/fakeUser";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = (props: UserOrdersPagePropsTypes) => {
  return <UserOrdersPage {...props} />;
};

const fakeData: UserOrdersPagePropsTypes = {
  isLogin: true,
  actionType: "userOrders",
  menuItems: [],
  navbarItems: [],
  orders: [fakeOrder1, fakeOrder2, fakeOrder3],
  user: fakeUser,
};

const fakeData2: UserOrdersPagePropsTypes = {
  ...fakeData,
  orders: [fakeOrder1, fakeOrder3],
};

const fakeData3: UserOrdersPagePropsTypes = {
  ...fakeData,
  orders: [],
};

describe("Test Page : User Orders", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeData} />, { wrapper: MemoryRouterProvider });
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    fakeData.orders.forEach((order) => {
      const holder = screen.getByTestId(`order_${order.orderId}`);
      expect(holder).toBeInTheDocument();
      const seeDetailBtn = holder.querySelector(
        '[data-testid="orderSeeDetailButton"]'
      ) as HTMLButtonElement;
      fireEvent.click(seeDetailBtn);
      expect(router.asPath).toEqual(`/user/orders/${order.orderId}`);
    });
  });
  it("its render properly test:2", () => {
    render(<CustomParent {...fakeData2} />, { wrapper: MemoryRouterProvider });
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    fakeData2.orders.forEach((order) => {
      const holder = screen.getByTestId(`order_${order.orderId}`);
      expect(holder).toBeInTheDocument();
      const seeDetailBtn = holder.querySelector(
        '[data-testid="orderSeeDetailButton"]'
      ) as HTMLButtonElement;
      fireEvent.click(seeDetailBtn);
      expect(router.asPath).toEqual(`/user/orders/${order.orderId}`);
    });
  });

  it("its render properly test:3", () => {
    render(<CustomParent {...fakeData3} />, { wrapper: MemoryRouterProvider });
    expect(screen.getByTestId("navbarHolder")).toBeInTheDocument();
    expect(screen.getByTestId("userDashBaseHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    fakeData3.orders.forEach((order) => {
      const holder = screen.getByTestId(`order_${order.orderId}`);
      expect(holder).toBeInTheDocument();
      const seeDetailBtn = holder.querySelector(
        '[data-testid="orderSeeDetailButton"]'
      ) as HTMLButtonElement;
      fireEvent.click(seeDetailBtn);
      expect(router.asPath).toEqual(`/user/orders/${order.orderId}`);
    });
  });
});
