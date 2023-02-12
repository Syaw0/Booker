import ForgetPasswordForm from "./forgetPasswordform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import checkForForgetPasswordForm from "src/utils/checkForgetPasswordForm";
import { Provider } from "react-redux";
import makeStore from "src/store/authenticate/authenticateStore";

jest.mock("src/utils/checkForgetPasswordForm.ts");
const mockCheckForForgetPasswordForm = checkForForgetPasswordForm as jest.Mock;

const CustomParent = () => (
  <Provider store={makeStore({})}>
    <ForgetPasswordForm />
  </Provider>
);

describe("Test Component : ForgetPasswordForm", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("forgetPasswordFormHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("forgetPasswordFormEmailInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("forgetPasswordFormNextButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("forgetPasswordFormLoginButton")
    ).toBeInTheDocument();
  });

  it("if inputs are empty if click on the next show error", () => {
    render(<CustomParent />);

    const next = screen.getByTestId("forgetPasswordFormNextButton");
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "inputs must have value!"
    );
    expect(mockCheckForForgetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if email has not a valid form show error", () => {
    render(<CustomParent />);
    const emailInput = screen.getByTestId("forgetPasswordFormEmailInput");
    const next = screen.getByTestId("forgetPasswordFormNextButton");
    fireEvent.change(emailInput, { target: { value: "sdwqd" } });
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "use valid email address!"
    );
    expect(mockCheckForForgetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if email  is ok show successful message if not show error", async () => {
    render(<CustomParent />);
    mockCheckForForgetPasswordForm.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error from server" }))
    );
    mockCheckForForgetPasswordForm.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "successfully checked and its ok" })
      )
    );
    const emailInput = screen.getByTestId("forgetPasswordFormEmailInput");
    const next = screen.getByTestId("forgetPasswordFormNextButton");
    fireEvent.change(emailInput, { target: { value: "sdwqd@gmail.com" } });

    fireEvent.click(next);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "error from server"
    );
    expect(mockCheckForForgetPasswordForm).toHaveBeenCalledTimes(1);

    fireEvent.click(next);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toHaveTextContent(
        "successfully checked and its ok"
      )
    );
    expect(mockCheckForForgetPasswordForm).toHaveBeenCalledTimes(2);
  });
});
