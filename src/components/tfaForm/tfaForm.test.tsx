import TfaForm from "./tfaForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import checkOtp from "src/utils/checkOtp";
import getFreshOtp from "src/utils/getFreshOtp";
import { act } from "react-dom/test-utils";
jest.useFakeTimers();
jest.mock("src/utils/getFreshOtp.ts");
jest.mock("src/utils/checkOtp.ts");

const mockCheckOtp = checkOtp as jest.Mock;
const mockGetFreshOtp = getFreshOtp as jest.Mock;

const CustomParent = ({ timerInit = 1 }: any) => (
  <TfaForm timerInit={timerInit} />
);

describe("Test Component : TfaForm", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("tfaFormHolder")).toBeInTheDocument();
    expect(screen.getByTestId("tfaForm_getFreshCode")).toBeInTheDocument();
    expect(screen.getByTestId("tfaFormNextButton")).toBeInTheDocument();
    expect(screen.getByTestId("tfaFormLoginButton")).toBeInTheDocument();
    expect(screen.getByTestId("otpHolder")).toBeInTheDocument();
    expect(screen.getByTestId("timer")).toBeInTheDocument();
  });
  it("if otp is empty then if we click on the next we got error ", () => {
    render(<CustomParent />);
    const next = screen.getByTestId("tfaFormNextButton");
    const inp1 = screen.getByTestId("otpInput_1");
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "otp input must have a value!"
    );
    expect(mockCheckOtp).toHaveBeenCalledTimes(0);
    fireEvent.change(inp1, { target: { value: "1" } });
    fireEvent.click(next);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "otp input must have a value!"
    );
    expect(mockCheckOtp).toHaveBeenCalledTimes(0);
  });

  it("if timer reach 0 we can click on the get fresh and if server response ok we got new key.", async () => {
    mockGetFreshOtp.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "its not Okay" }))
    );
    mockGetFreshOtp.mockReturnValueOnce(
      new Promise((res) => res({ status: true, msg: "its Okay" }))
    );
    render(<CustomParent timerInit={0} />);
    const getFresh = screen.getByTestId("tfaForm_getFreshCode");

    fireEvent.click(getFresh);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toHaveTextContent(
        "its not Okay"
      )
    );
    expect(mockGetFreshOtp).toBeCalledTimes(1);

    fireEvent.click(getFresh);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toHaveTextContent("its Okay")
    );
    expect(mockGetFreshOtp).toBeCalledTimes(2);
  });
  it("if timer is not end click on the get fresh code do nothing", async () => {
    mockGetFreshOtp.mockClear();
    render(<CustomParent timerInit={1} />);
    const getFresh = screen.getByTestId("tfaForm_getFreshCode");
    fireEvent.click(getFresh);
    expect(mockGetFreshOtp).toBeCalledTimes(0);
  });

  it("if otp is correct show success else error msg", async () => {
    mockCheckOtp.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error" }))
    );
    mockCheckOtp.mockReturnValueOnce(
      new Promise((res) => res({ status: true, msg: "okay" }))
    );
    render(<CustomParent timerInit={0} />);
    const next = screen.getByTestId("tfaFormNextButton");
    const inp1 = screen.getByTestId("otpInput_0");
    const inp2 = screen.getByTestId("otpInput_1");
    const inp3 = screen.getByTestId("otpInput_2");
    const inp4 = screen.getByTestId("otpInput_3");
    const inp5 = screen.getByTestId("otpInput_4");
    const inp6 = screen.getByTestId("otpInput_5");
    fireEvent.change(inp1, { target: { value: "2" } });
    fireEvent.change(inp2, { target: { value: "2" } });
    fireEvent.change(inp3, { target: { value: "2" } });
    fireEvent.change(inp4, { target: { value: "2" } });
    fireEvent.change(inp5, { target: { value: "2" } });
    fireEvent.change(inp6, { target: { value: "2" } });

    fireEvent.click(next);
    expect(mockCheckOtp).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toHaveTextContent("error")
    );

    fireEvent.click(next);
    expect(mockCheckOtp).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toHaveTextContent("okay")
    );
  });
});
