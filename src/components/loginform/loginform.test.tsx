import LoginForm from "./loginform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import checkLoginForm from "src/utils/checkLoginform";
import { Provider } from "react-redux";
import makeStore from "src/store/authenticate/authenticateStore";

jest.mock("src/utils/checkLoginform.ts");
const mockCheckLoginform = checkLoginForm as jest.Mock;

const CustomParent = () => (
  <Provider store={makeStore({})}>
    <LoginForm />
  </Provider>
);

describe("Test Component : Loginform", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("loginformHolder")).toBeInTheDocument();
    expect(screen.getByTestId("loginformPasswordInput")).toBeInTheDocument();
    expect(screen.getByTestId("loginformEmailInput")).toBeInTheDocument();
    expect(
      screen.getByTestId("loginformForgetPasswordButton")
    ).toBeInTheDocument();
    expect(screen.getByTestId("loginformLoginButton")).toBeInTheDocument();
    expect(screen.getByTestId("loginformSignupButton")).toBeInTheDocument();
  });

  it("if inputs are empty if click on the login show error", () => {
    render(<CustomParent />);

    const loginBtn = screen.getByTestId("loginformLoginButton");
    fireEvent.click(loginBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "inputs must have value!"
    );
    expect(mockCheckLoginform).toHaveBeenCalledTimes(0);
  });

  it("if email has not a valid form show error", () => {
    render(<CustomParent />);
    const passInput = screen.getByTestId("loginformPasswordInput");
    const emailInput = screen.getByTestId("loginformEmailInput");
    const loginBtn = screen.getByTestId("loginformLoginButton");
    fireEvent.change(passInput, { target: { value: "123" } });
    fireEvent.change(emailInput, { target: { value: "sdwqd" } });
    fireEvent.click(loginBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "use valid email address!"
    );
    expect(mockCheckLoginform).toHaveBeenCalledTimes(0);
  });
  it("if email and password is ok show successful message if not show error", async () => {
    render(<CustomParent />);
    mockCheckLoginform.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error from server" }))
    );
    mockCheckLoginform.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "successfully checked and its ok" })
      )
    );
    const passInput = screen.getByTestId("loginformPasswordInput");
    const emailInput = screen.getByTestId("loginformEmailInput");
    const loginBtn = screen.getByTestId("loginformLoginButton");
    fireEvent.change(passInput, { target: { value: "123" } });
    fireEvent.change(emailInput, { target: { value: "sdwqd@gmail.com" } });

    fireEvent.click(loginBtn);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "error from server"
    );
    expect(mockCheckLoginform).toHaveBeenCalledTimes(1);

    fireEvent.click(loginBtn);
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
    expect(mockCheckLoginform).toHaveBeenCalledTimes(2);
  });
});
