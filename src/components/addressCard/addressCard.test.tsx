import AddressCard from "./addressCard";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import router from "next-router-mock";
import deleteAddress from "src/utils/deleteAddress";
import { Provider } from "react-redux";
import makeStore from "src/store/userAddresses/userAddresses";
import fakeUserAddressesPageData from "src/shared/fakeUserAddressesPageData";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import { address1 } from "src/shared/fakeAddresses";
import { act } from "react-dom/test-utils";

jest.mock("src/utils/deleteAddress.ts");
jest.mock("next/router", () => require("next-router-mock"));

const mockDeleteAddress = deleteAddress as jest.Mock;

const CustomParent = (props: Address) => {
  return (
    <Provider store={makeStore(fakeUserAddressesPageData)}>
      <AddressCard {...props} />
    </Provider>
  );
};

const fakeAddress1: Address = {
  city: "Ebertchester",
  country: "Cambridgeshire",
  receiverName: "Hailee",
  state: "California",
  street: "Santina Lodge",
  tel: "752.526.8001 x4954",
  title: "HOME",
  zipCode: "75482-4070",
};

const fakeAddress2: Address = {
  city: "South Estherstad",
  country: "Bedfordshire",
  receiverName: "Liliana",
  state: "Wisconsin",
  street: "Jana Ferry",
  tel: "(775) 295-6481 x85699",
  title: "WORK",
  zipCode: "06625-5748",
};

describe("Test Component : AddressCard", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeAddress1} />);

    expect(
      screen.getByTestId(`addressCard_${fakeAddress1.title}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("addressCardTitle")).toHaveTextContent(
      fakeAddress1.title
    );
    expect(screen.getByTestId("addressCardFullAddress")).toHaveTextContent(
      `${fakeAddress1.country} - ${fakeAddress1.state} - ${fakeAddress1.city} - ${fakeAddress1.street}`
    );
    expect(screen.getByTestId("addressCardCityAndState")).toHaveTextContent(
      `${fakeAddress1.state} - ${fakeAddress1.city}`
    );
    expect(screen.getByTestId("addressCardZipCode")).toHaveTextContent(
      `${fakeAddress1.zipCode}`
    );
    expect(screen.getByTestId("addressCardTel")).toHaveTextContent(
      `${fakeAddress1.tel}`
    );
    expect(screen.getByTestId("addressCardReceiverName")).toHaveTextContent(
      fakeAddress1.receiverName
    );
  });

  it("its render properly test:2", () => {
    render(<CustomParent {...fakeAddress2} />);

    expect(
      screen.getByTestId(`addressCard_${fakeAddress2.title}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId("addressCardTitle")).toHaveTextContent(
      fakeAddress2.title
    );
    expect(screen.getByTestId("addressCardFullAddress")).toHaveTextContent(
      `${fakeAddress2.country} - ${fakeAddress2.state} - ${fakeAddress2.city} - ${fakeAddress2.street}`
    );
    expect(screen.getByTestId("addressCardCityAndState")).toHaveTextContent(
      `${fakeAddress2.state} - ${fakeAddress2.city}`
    );
    expect(screen.getByTestId("addressCardZipCode")).toHaveTextContent(
      `${fakeAddress2.zipCode}`
    );
    expect(screen.getByTestId("addressCardTel")).toHaveTextContent(
      `${fakeAddress2.tel}`
    );
    expect(screen.getByTestId("addressCardReceiverName")).toHaveTextContent(
      fakeAddress2.receiverName
    );
  });

  it("its render properly menu items", () => {
    render(<CustomParent {...fakeAddress2} />);
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    expect(screen.getByTestId("Edit")).toBeInTheDocument();
    expect(screen.getByTestId("Delete")).toBeInTheDocument();
  });

  it("if click on the edit we will move to /user/addresses/edit?title=?", () => {
    render(<CustomParent {...fakeAddress2} />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    fireEvent.click(screen.getByTestId("Edit"));
    expect(router.asPath).toEqual(
      `/user/addresses/edit?title=${fakeAddress2.title}`
    );
  });

  it("if click on the edit we will move to /user/addresses/edit?title=? test:2", () => {
    render(<CustomParent {...fakeAddress1} />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    fireEvent.click(screen.getByTestId("Edit"));
    expect(router.asPath).toEqual(
      `/user/addresses/edit?title=${fakeAddress1.title}`
    );
  });

  it("if click on the delete server response with new addresses", async () => {
    mockDeleteAddress.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: [address1] }))
    );
    render(<CustomParent {...fakeAddress1} />);
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    await act(async () => fireEvent.click(screen.getByTestId("Delete")));
    expect(mockDeleteAddress).toBeCalledTimes(1);
  });
});
