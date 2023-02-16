import AddressModifier from "./addressModifier";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import makeStore from "src/store/userAddAddress/userAddAddress";
import fakeUserAddAddressPageData from "src/shared/fakeUserAddAddressPageData";
import { address1, address2, address3 } from "src/shared/fakeAddresses";
import router from "next-router-mock";
import addAddress from "src/utils/addAddress";
import changeAddress from "src/utils/changeAddress";
import { act } from "react-dom/test-utils";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("src/utils/changeAddress.ts");
jest.mock("src/utils/addAddress.ts");

const mockAddAddress = addAddress as jest.Mock;
const mockChangeAddress = changeAddress as jest.Mock;

const CustomParent = ({
  props,
  isEdit,
}: {
  props: UserAddAddressPagePropsTypes;
  isEdit: boolean;
}) => {
  return (
    <Provider store={makeStore(props)}>
      <AddressModifier isEdit={isEdit} />
    </Provider>
  );
};
const fakeAddress1 = { ...address1 };
const fakeData: UserAddAddressPagePropsTypes = {
  ...fakeUserAddAddressPageData,
  address: fakeAddress1,
};

const fakeAddress2 = { ...address2 };
const fakeData2: UserAddAddressPagePropsTypes = {
  ...fakeUserAddAddressPageData,
  address: fakeAddress2,
};

const fakeAddress3 = { ...address3 };
const fakeData3: UserAddAddressPagePropsTypes = {
  ...fakeUserAddAddressPageData,
  address: fakeAddress3,
};

describe("Test Component : Address Modifier", () => {
  describe("test if its render correctly", () => {
    it("its render properly", () => {
      render(<CustomParent isEdit={false} props={fakeData} />);
      expect(screen.getByTestId("addressModifierHolder")).toBeInTheDocument();
      expect(screen.getByTestId("addressModifierHeadText")).toHaveTextContent(
        "Adding New Address"
      );
      expect(screen.getByTestId("addingAddressTitle")).toHaveValue(
        fakeData.address.title
      );
      expect(screen.getByTestId("addingAddressReceiverName")).toHaveValue(
        fakeData.address.receiverName
      );
      expect(screen.getByTestId("addingAddressCountry")).toHaveValue(
        fakeData.address.country
      );
      expect(screen.getByTestId("addingAddressState")).toHaveValue(
        fakeData.address.state
      );
      expect(screen.getByTestId("addingAddressCity")).toHaveValue(
        fakeData.address.city
      );
      expect(screen.getByTestId("addingAddressZipCode")).toHaveValue(
        fakeData.address.zipCode
      );
      expect(screen.getByTestId("addingAddressStreet")).toHaveValue(
        fakeData.address.street
      );
      expect(screen.getByTestId("addingAddressTel")).toHaveValue(
        fakeData.address.tel
      );
      expect(screen.getByTestId("addressModifierButton")).toHaveTextContent(
        "Add Address"
      );
    });
    it("its render properly test:2", () => {
      render(<CustomParent isEdit={true} props={fakeData2} />);
      expect(screen.getByTestId("addressModifierHolder")).toBeInTheDocument();
      expect(screen.getByTestId("addressModifierHeadText")).toHaveTextContent(
        "Editing Address"
      );
      expect(screen.getByTestId("addingAddressTitle")).toHaveValue(
        fakeData2.address.title
      );
      expect(screen.getByTestId("addingAddressReceiverName")).toHaveValue(
        fakeData2.address.receiverName
      );
      expect(screen.getByTestId("addingAddressCountry")).toHaveValue(
        fakeData2.address.country
      );
      expect(screen.getByTestId("addingAddressState")).toHaveValue(
        fakeData2.address.state
      );
      expect(screen.getByTestId("addingAddressCity")).toHaveValue(
        fakeData2.address.city
      );
      expect(screen.getByTestId("addingAddressZipCode")).toHaveValue(
        fakeData2.address.zipCode
      );
      expect(screen.getByTestId("addingAddressStreet")).toHaveValue(
        fakeData2.address.street
      );
      expect(screen.getByTestId("addingAddressTel")).toHaveValue(
        fakeData2.address.tel
      );
      expect(screen.getByTestId("addressModifierButton")).toHaveTextContent(
        "Update Address"
      );
    });
    it("its render properly test:2", () => {
      render(<CustomParent isEdit={true} props={fakeData3} />);
      expect(screen.getByTestId("addressModifierHolder")).toBeInTheDocument();
      expect(screen.getByTestId("addressModifierHeadText")).toHaveTextContent(
        "Editing Address"
      );
      expect(screen.getByTestId("addingAddressTitle")).toHaveValue(
        fakeData3.address.title
      );
      expect(screen.getByTestId("addingAddressReceiverName")).toHaveValue(
        fakeData3.address.receiverName
      );
      expect(screen.getByTestId("addingAddressCountry")).toHaveValue(
        fakeData3.address.country
      );
      expect(screen.getByTestId("addingAddressState")).toHaveValue(
        fakeData3.address.state
      );
      expect(screen.getByTestId("addingAddressCity")).toHaveValue(
        fakeData3.address.city
      );
      expect(screen.getByTestId("addingAddressZipCode")).toHaveValue(
        fakeData3.address.zipCode
      );
      expect(screen.getByTestId("addingAddressStreet")).toHaveValue(
        fakeData3.address.street
      );
      expect(screen.getByTestId("addingAddressTel")).toHaveValue(
        fakeData3.address.tel
      );
      expect(screen.getByTestId("addressModifierButton")).toHaveTextContent(
        "Update Address"
      );
    });

    describe("test inputs behavior", () => {
      it("if inputs are empty then if click on the add button show error", () => {
        render(
          <CustomParent isEdit={false} props={fakeUserAddAddressPageData} />
        );
        const button = screen.getByTestId("addressModifierButton");
        fireEvent.change(screen.getByTestId("addingAddressTel"), {
          target: { value: "" },
        });
        fireEvent.click(button);
        expect(mockAddAddress).toBeCalledTimes(0);
        expect(screen.getByTestId("errorMessage")).toHaveTextContent(
          "inputs must be filled!"
        );
      });
      it("(ADD)if inputs are filled then if clicked on the button show waiting and then message", async () => {
        mockAddAddress.mockReturnValueOnce(
          new Promise((res) => res({ status: false, msg: "error" }))
        );
        mockAddAddress.mockReturnValueOnce(
          new Promise((res) => res({ status: true, msg: "okay" }))
        );

        render(<CustomParent isEdit={false} props={fakeData} />);
        const button = screen.getByTestId("addressModifierButton");
        fireEvent.click(button);
        expect(mockAddAddress).toBeCalledTimes(1);
        expect(mockChangeAddress).toBeCalledTimes(0);
        await waitFor(() =>
          expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(screen.getByTestId("errorMessage")).toHaveTextContent("error")
        );

        await act(async () => fireEvent.click(button));
        expect(mockAddAddress).toBeCalledTimes(2);
        expect(mockChangeAddress).toBeCalledTimes(0);

        await waitFor(() =>
          expect(screen.getByTestId("successMessage")).toHaveTextContent("okay")
        );
        await waitFor(() => expect(router.asPath).toEqual("/user/addresses"));
      });
      it("(Edit)if inputs are filled then if clicked on the button show waiting and then message", async () => {
        mockAddAddress.mockClear();
        mockChangeAddress.mockClear();
        mockChangeAddress.mockReturnValueOnce(
          new Promise((res) => res({ status: false, msg: "error" }))
        );
        mockChangeAddress.mockReturnValueOnce(
          new Promise((res) => res({ status: true, msg: "okay" }))
        );

        render(<CustomParent isEdit={true} props={fakeData} />);
        const button = screen.getByTestId("addressModifierButton");
        fireEvent.click(button);
        expect(mockChangeAddress).toBeCalledTimes(1);
        expect(mockAddAddress).toBeCalledTimes(0);
        await waitFor(() =>
          expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
        );
        await waitFor(() =>
          expect(screen.getByTestId("errorMessage")).toHaveTextContent("error")
        );

        await act(async () => fireEvent.click(button));
        expect(mockChangeAddress).toBeCalledTimes(2);
        expect(mockAddAddress).toBeCalledTimes(0);

        await waitFor(() =>
          expect(screen.getByTestId("successMessage")).toHaveTextContent("okay")
        );
        await waitFor(() => expect(router.asPath).toEqual("/user/addresses"));
      });
    });
  });
});
