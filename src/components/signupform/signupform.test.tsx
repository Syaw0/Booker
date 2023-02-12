import SignupForm from "./signupform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import checkSignupFrom from "src/utils/checkSignupForm";
import { Provider } from "react-redux";
import makeStore from "src/store/authenticate/authenticateStore";

jest.mock("src/utils/checkSignupForm.ts");
const mockSignupform = checkSignupFrom as jest.Mock;

const CustomParent = () => (
  <Provider store={makeStore({})}>
    <SignupForm />
  </Provider>
);

describe("Test Component : Signupform", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("signupformHolder")).toBeInTheDocument();
    expect(screen.getByTestId("signupformEmailInput")).toBeInTheDocument();
    expect(screen.getByTestId("signupformPasswordInput")).toBeInTheDocument();
    expect(screen.getByTestId("signupformSignupButton")).toBeInTheDocument();
    expect(screen.getByTestId("signupformLoginButton")).toBeInTheDocument();
  });

  it("if inputs are empty if click on the signup show error", () => {
    render(<CustomParent />);

    const signupBtn = screen.getByTestId("signupformSignupButton");
    fireEvent.click(signupBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "inputs must have value!"
    );
    expect(mockSignupform).toHaveBeenCalledTimes(0);
  });

  it("if email has not a valid form show error", () => {
    render(<CustomParent />);
    const passInput = screen.getByTestId("signupformPasswordInput");
    const emailInput = screen.getByTestId("signupformEmailInput");
    const signupBtn = screen.getByTestId("signupformSignupButton");
    fireEvent.change(passInput, { target: { value: "123" } });
    fireEvent.change(emailInput, { target: { value: "sdwqd" } });
    fireEvent.click(signupBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "use valid email address!"
    );
    expect(mockSignupform).toHaveBeenCalledTimes(0);
  });

  it("if password has 4 or less character show error", () => {
    render(<CustomParent />);
    const passInput = screen.getByTestId("signupformPasswordInput");
    const emailInput = screen.getByTestId("signupformEmailInput");
    const signupBtn = screen.getByTestId("signupformSignupButton");
    fireEvent.change(passInput, { target: { value: "123" } });
    fireEvent.change(emailInput, { target: { value: "sdwqd@gmail.com" } });
    fireEvent.click(signupBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "password must has 5 or more character!"
    );
    expect(mockSignupform).toHaveBeenCalledTimes(0);
  });
  it("if email and password is ok show successful message if not show error", async () => {
    render(<CustomParent />);
    mockSignupform.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error from server" }))
    );
    mockSignupform.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "successfully checked and its ok" })
      )
    );
    const passInput = screen.getByTestId("signupformPasswordInput");
    const emailInput = screen.getByTestId("signupformEmailInput");
    const signupBtn = screen.getByTestId("signupformSignupButton");
    fireEvent.change(passInput, { target: { value: "123123" } });
    fireEvent.change(emailInput, { target: { value: "sdwqd@gmail.com" } });

    fireEvent.click(signupBtn);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "error from server"
    );
    expect(mockSignupform).toHaveBeenCalledTimes(1);

    fireEvent.click(signupBtn);
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
    expect(mockSignupform).toHaveBeenCalledTimes(2);
  });
});
