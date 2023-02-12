import ResetPasswordForm from "./resetPasswordform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import resetPassword from "src/utils/resetPassword";
import { Provider } from "react-redux";
import makeStore from "src/store/authenticate/authenticateStore";

jest.mock("src/utils/resetPassword.ts");
const mockResetPasswordForm = resetPassword as jest.Mock;

const CustomParent = () => (
  <Provider store={makeStore({})}>
    <ResetPasswordForm />
  </Provider>
);

describe("Test Component : ResetPasswordForm", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("resetPasswordFormHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormOldPasswordInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormNewPasswordInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormRetypePasswordInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormNextButton")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resetPasswordFormLoginButton")
    ).toBeInTheDocument();
  });

  it("if inputs are empty if click on the next show error", () => {
    render(<CustomParent />);

    const next = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "inputs must have value!"
    );
    expect(mockResetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if new password is not valid(character) show error", () => {
    render(<CustomParent />);
    const oldPass = screen.getByTestId("resetPasswordFormOldPasswordInput");
    const newPass = screen.getByTestId("resetPasswordFormNewPasswordInput");
    const retypePass = screen.getByTestId(
      "resetPasswordFormRetypePasswordInput"
    );
    const next = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.change(oldPass, { target: { value: "sdwqd1" } });
    fireEvent.change(newPass, { target: { value: "sd" } });
    fireEvent.change(retypePass, { target: { value: "sdw" } });
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "password must has 5 or more character!"
    );
    expect(mockResetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if new password and old are same show error", () => {
    render(<CustomParent />);
    const oldPass = screen.getByTestId("resetPasswordFormOldPasswordInput");
    const newPass = screen.getByTestId("resetPasswordFormNewPasswordInput");
    const retypePass = screen.getByTestId(
      "resetPasswordFormRetypePasswordInput"
    );
    const next = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.change(oldPass, { target: { value: "123123" } });
    fireEvent.change(newPass, { target: { value: "123123" } });
    fireEvent.change(retypePass, { target: { value: "123123" } });
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "the old and new password is same!"
    );
    expect(mockResetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if new password and retype is not same show error", () => {
    render(<CustomParent />);
    const oldPass = screen.getByTestId("resetPasswordFormOldPasswordInput");
    const newPass = screen.getByTestId("resetPasswordFormNewPasswordInput");
    const retypePass = screen.getByTestId(
      "resetPasswordFormRetypePasswordInput"
    );
    const next = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.change(oldPass, { target: { value: "123123" } });
    fireEvent.change(newPass, { target: { value: "1231234" } });
    fireEvent.change(retypePass, { target: { value: "1231235" } });
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "the new password and retype is not same!"
    );
    expect(mockResetPasswordForm).toHaveBeenCalledTimes(0);
  });

  it("if email  is ok show successful message if not show error", async () => {
    render(<CustomParent />);
    mockResetPasswordForm.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error from server" }))
    );
    mockResetPasswordForm.mockReturnValueOnce(
      new Promise((res) =>
        res({ status: true, msg: "successfully checked and its ok" })
      )
    );
    const oldPass = screen.getByTestId("resetPasswordFormOldPasswordInput");
    const newPass = screen.getByTestId("resetPasswordFormNewPasswordInput");
    const retypePass = screen.getByTestId(
      "resetPasswordFormRetypePasswordInput"
    );
    const next = screen.getByTestId("resetPasswordFormNextButton");
    fireEvent.change(oldPass, { target: { value: "123123" } });
    fireEvent.change(newPass, { target: { value: "1231235" } });
    fireEvent.change(retypePass, { target: { value: "1231235" } });

    fireEvent.click(next);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "error from server"
    );
    expect(mockResetPasswordForm).toHaveBeenCalledTimes(1);

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
    expect(mockResetPasswordForm).toHaveBeenCalledTimes(2);
  });
});
