import FilterPriceRange from "./filterPriceRange";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "src/store/books/booksStore";
import fakeBooksPageData from "src/shared/fakeBooksPageData";

const CustomParent = (props: BooksPagePropsTypes) => {
  return (
    <Provider store={makeStore(props)}>
      <FilterPriceRange />
    </Provider>
  );
};

describe("Test Component : Filter Price Range", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeBooksPageData} />);
    expect(
      screen.getByTestId("booksFilterPriceRangeHolder")
    ).toBeInTheDocument();
    expect(screen.getByTestId("booksFilterMaxInput")).toBeInTheDocument();
    expect(screen.getByTestId("booksFilterMaxInput")).toBeInTheDocument();
  });

  it("if we give a provider and data will show it in these inputs", () => {
    const propData = fakeBooksPageData;
    propData.filters.priceRange = { max: 123, min: 1 };
    render(<CustomParent {...propData} />);
    const min = screen.getByTestId("booksFilterMinInput");
    const max = screen.getByTestId("booksFilterMaxInput");
    expect(min).toHaveValue(`${propData.filters.priceRange.min}`);
    expect(max).toHaveValue(`${propData.filters.priceRange.max}`);
  });

  it("change it manually", () => {
    render(<CustomParent {...fakeBooksPageData} />);
    const min = screen.getByTestId("booksFilterMinInput");
    const max = screen.getByTestId("booksFilterMaxInput");
    fireEvent.change(max, { target: { value: "123" } });
    fireEvent.change(min, { target: { value: "14" } });
    expect(min).toHaveValue("14");
    expect(max).toHaveValue("123");
  });
});
