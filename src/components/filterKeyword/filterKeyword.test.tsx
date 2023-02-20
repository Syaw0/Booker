import FilterKeyword from "./filterKeyword";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "src/store/books/booksStore";
import fakeBooksPageData from "src/shared/fakeBooksPageData";

const pageData = fakeBooksPageData;

const CustomParent = (props: BooksPagePropsTypes) => {
  return (
    <Provider store={makeStore(props)}>
      <FilterKeyword />
    </Provider>
  );
};

describe("Test Component : Filter Keyword", () => {
  it("its render properly", () => {
    render(<CustomParent {...pageData} />);
    expect(screen.getByTestId("booksKeywordInput")).toBeInTheDocument();
    expect(screen.getByTestId("booksFilterKeywordHolder")).toBeInTheDocument();
  });

  it("if provider got keyword data ,inputs must show it", () => {
    const fakeData = pageData;
    fakeData.filters.keyword = "HELLLO";
    render(<CustomParent {...fakeData} />);
    expect(screen.getByTestId("booksKeywordInput")).toHaveValue(
      fakeData.filters.keyword
    );
  });

  it("change keyword input", () => {
    render(<CustomParent {...pageData} />);
    fireEvent.change(screen.getByTestId("booksKeywordInput"), {
      target: { value: "some bela bela" },
    });
    expect(screen.getByTestId("booksKeywordInput")).toHaveValue(
      "some bela bela"
    );
  });
});
