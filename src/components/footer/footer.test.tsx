import Footer from "./footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const CustomParent = () => {
  return <Footer />;
};

describe("Test Component : Footer", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("footerHolder")).toBeInTheDocument();
    expect(screen.getByTestId("footerText")).toBeInTheDocument();
    expect(screen.getByTestId("footerText")).toHaveTextContent(
      "© 2023 Booker , All Rights reserved"
    );
  });
});
