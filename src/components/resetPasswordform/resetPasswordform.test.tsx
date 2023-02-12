import ResetPasswordForm from "./resetPasswordform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import checkForResetPasswordForm from "src/utils/checkResetPasswordForm";

jest.mock("src/utils/checkResetPasswordForm.ts");
const mockCheckForResetPasswordForm = checkForResetPasswordForm as jest.Mock;

const CustomParent = () => <ResetPasswordForm />;

describe("Test Component : ResetPasswordForm", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("resetPasswordFormHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormEmailInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormNextButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormLoginButton")
    ).toBeInTheDocument();
  });

  it("if inputs are empty if click on the signup show error", () => {
    render(<CustomParent />);

    const loginBtn = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.click(loginBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "inputs must have value!"
    );
    expect(mockCheckForResetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if email has not a valid form show error", () => {
    render(<CustomParent />);
    const emailInput = screen.getByTestId("resetPasswordFormEmailInput");
    const loginBtn = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.change(emailInput, { target: { value: "sdwqd" } });
    fireEvent.click(loginBtn);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "use valid email address!"
    );
    expect(mockCheckForResetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if email  is ok show successful message if not show error", async () => {
    render(<CustomParent />);
    mockCheckForResetPasswordForm.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error from server" }))
    );
    mockCheckForResetPasswordForm.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "successfully checked and its ok" })
      )
    );
    const emailInput = screen.getByTestId("resetPasswordFormEmailInput");
    const loginBtn = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.change(emailInput, { target: { value: "sdwqd@gmail.com" } });

    fireEvent.click(loginBtn);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "error from server"
    );
    expect(mockCheckForResetPasswordForm).toHaveBeenCalledTimes(1);

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
    expect(mockCheckForResetPasswordForm).toHaveBeenCalledTimes(2);
  });
});
