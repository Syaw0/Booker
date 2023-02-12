import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthenticatePage from "src/pages/auth";
import router from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import getFreshOtp from "src/utils/getFreshOtp";
import checkLoginform from "src/utils/checkLoginform";
import checkSignupForm from "src/utils/checkSignupForm";
import checkForgetPasswordForm from "src/utils/checkForgetPasswordForm";
import resetPassword from "src/utils/resetPassword";
import checkOtp from "src/utils/checkOtp";
import { act } from "react-dom/test-utils";
import signup from "src/utils/signup";

jest.useFakeTimers();

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("src/utils/getFreshOtp.ts");
jest.mock("src/utils/checkLoginform.ts");
jest.mock("src/utils/checkSignupForm.ts");
jest.mock("src/utils/checkForgetPasswordForm.ts");
jest.mock("src/utils/resetPassword.ts");
jest.mock("src/utils/checkOtp.ts");
jest.mock("src/utils/signup.ts");

const mockSignup = signup as jest.Mock;
const mockGetFreshOtp = getFreshOtp as jest.Mock;
const mockCheckOtp = checkOtp as jest.Mock;
const mockCheckLoginform = checkLoginform as jest.Mock;
const mockCheckSignupForm = checkSignupForm as jest.Mock;
const mockCheckForgetPasswordForm = checkForgetPasswordForm as jest.Mock;
const mockResetPassword = resetPassword as jest.Mock;

const CustomParent = () => <AuthenticatePage />;

describe("Test Page: Authenticate page", () => {
  it("its render properly in the first render", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("authenticateHolder")).toBeInTheDocument();
    expect(screen.getByTestId("authenticateLeft")).toBeInTheDocument();
    expect(screen.getByTestId("authenticateRight")).toBeInTheDocument();
    expect(screen.getByTestId("loginformHolder")).toBeInTheDocument();
  });

  it("lets navigate between components", () => {
    render(<CustomParent />);
    fireEvent.click(screen.getByTestId("loginformSignupButton"));
    expect(screen.getByTestId("signupformHolder")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("signupformLoginButton"));
    expect(screen.getByTestId("loginformHolder")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("loginformForgetPasswordButton"));
    expect(screen.getByTestId("forgetPasswordFormHolder")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("forgetPasswordFormLoginButton"));
    expect(screen.getByTestId("loginformHolder")).toBeInTheDocument();
  });

  it("login flow", async () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    mockCheckLoginform.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );
    fireEvent.change(screen.getByTestId("loginformEmailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("loginformPasswordInput"), {
      target: { value: "123123123" },
    });
    fireEvent.click(screen.getByTestId("loginformLoginButton"));
    expect(mockCheckLoginform).toHaveBeenCalledTimes(1);
    let tfa;
    try {
      tfa = screen.getByTestId("tfaFormHolder");
    } catch (err) {}
    expect(tfa).toBeUndefined();
    mockCheckLoginform.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("loginformLoginButton"));
    await waitFor(() =>
      expect(screen.getByTestId("tfaFormHolder")).toBeInTheDocument()
    );

    // now we are in two factor authentication component

    mockCheckOtp.mockReturnValue(new Promise((res) => res({ status: false })));
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 2 } });
    fireEvent.change(inp3, { target: { value: 3 } });
    fireEvent.change(inp4, { target: { value: 4 } });
    fireEvent.change(inp5, { target: { value: 5 } });
    fireEvent.change(inp6, { target: { value: 6 } });

    fireEvent.click(screen.getByTestId("tfaFormNextButton"));
    await waitFor(() => expect(router.asPath).not.toEqual("/"));

    mockCheckOtp.mockReturnValue(new Promise((res) => res({ status: true })));
    fireEvent.click(screen.getByTestId("tfaFormNextButton"));
    await waitFor(() => expect(router.asPath).toEqual("/"));

    fireEvent.click(screen.getByTestId("tfaFormLoginButton"));
    expect(screen.getByTestId("loginformHolder")).toBeInTheDocument();
  });

  it("signup flow", async () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    await waitFor(() => router.replace("/"));
    fireEvent.click(screen.getByTestId("loginformSignupButton"));
    mockCheckSignupForm.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );

    fireEvent.change(screen.getByTestId("signupformEmailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("signupformPasswordInput"), {
      target: { value: "123123123" },
    });
    fireEvent.click(screen.getByTestId("signupformSignupButton"));
    expect(mockCheckSignupForm).toHaveBeenCalledTimes(1);

    let tfa;
    try {
      tfa = screen.getByTestId("tfaFormHolder");
    } catch (err) {}

    expect(tfa).toBeUndefined();

    mockCheckSignupForm.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "" }))
    );
    fireEvent.click(screen.getByTestId("signupformSignupButton"));
    await waitFor(() =>
      expect(screen.getByTestId("tfaFormHolder")).toBeInTheDocument()
    );

    // now we are in two factor authentication component

    mockCheckOtp.mockReturnValue(new Promise((res) => res({ status: true })));
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 2 } });
    fireEvent.change(inp3, { target: { value: 3 } });
    fireEvent.change(inp4, { target: { value: 4 } });
    fireEvent.change(inp5, { target: { value: 5 } });
    fireEvent.change(inp6, { target: { value: 6 } });

    mockSignup.mockReturnValue(new Promise((res) => res({ status: true })));
    act(() => fireEvent.click(screen.getByTestId("tfaFormNextButton")));
    await waitFor(() => expect(screen.getByTestId("successMessage")));
    await waitFor(() => expect(router.asPath).toEqual("/"));
    fireEvent.click(screen.getByTestId("tfaFormLoginButton"));
    await waitFor(() =>
      expect(screen.getByTestId("loginformHolder")).toBeInTheDocument()
    );
  });

  it("forget Password flow", async () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    await waitFor(() => router.replace("/auth"));
    mockCheckForgetPasswordForm.mockResolvedValue(
      new Promise((res) => res({ status: false }))
    );
    fireEvent.click(screen.getByTestId("loginformForgetPasswordButton"));
    expect(screen.getByTestId("forgetPasswordFormHolder")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("forgetPasswordFormEmailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.click(screen.getByTestId("forgetPasswordFormNextButton"));
    expect(mockCheckForgetPasswordForm).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    expect(screen.getByTestId("forgetPasswordFormHolder")).toBeInTheDocument();
    mockCheckForgetPasswordForm.mockResolvedValue(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("forgetPasswordFormNextButton"));

    await waitFor(() =>
      expect(screen.getByTestId("tfaFormHolder")).toBeInTheDocument()
    );
    mockCheckOtp.mockReturnValue(new Promise((res) => res({ status: true })));
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: 1 } });
    fireEvent.change(inp2, { target: { value: 2 } });
    fireEvent.change(inp3, { target: { value: 3 } });
    fireEvent.change(inp4, { target: { value: 4 } });
    fireEvent.change(inp5, { target: { value: 5 } });
    fireEvent.change(inp6, { target: { value: 6 } });

    fireEvent.click(screen.getByTestId("tfaFormNextButton"));

    // now we are going to resetPassword component

    mockResetPassword.mockReturnValue(
      new Promise((res) => res({ status: false, msg: "" }))
    );

    await waitFor(() =>
      expect(screen.getByTestId("resetPasswordFormHolder")).toBeInTheDocument()
    );
    fireEvent.change(screen.getByTestId("resetPasswordFormNewPasswordInput"), {
      target: { value: "12122" },
    });
    fireEvent.change(screen.getByTestId("resetPasswordFormOldPasswordInput"), {
      target: { value: "3333333" },
    });
    fireEvent.change(
      screen.getByTestId("resetPasswordFormRetypePasswordInput"),
      { target: { value: "12122" } }
    );
    fireEvent.click(screen.getByTestId("resetPasswordFormNextButton"));
    expect(mockResetPassword).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    let loginForm;
    try {
      loginForm = screen.getByTestId("loginformHolder");
    } catch (err) {}
    expect(loginForm).toBeUndefined();

    mockResetPassword.mockReturnValue(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("resetPasswordFormNextButton"));
    await waitFor(() =>
      expect(screen.getByTestId("loginformHolder")).toBeInTheDocument()
    );
  });
});
