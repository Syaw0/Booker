import FilterCategories from "./filterCategories";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "src/store/books/booksStore";
import fakeBooksPageData from "src/shared/fakeBooksPageData";
import categories from "src/shared/allCategories";

const CustomParent = (props: BooksPagePropsTypes) => {
  return (
    <Provider store={makeStore(props)}>
      <FilterCategories />
    </Provider>
  );
};

describe("Test Component : Filter Category", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeBooksPageData} />);
    expect(screen.getByTestId("filterCategoryHolder")).toBeInTheDocument();
    categories.forEach((cate) => {
      const item = screen.getByTestId(`filterCategoryItem_${cate}`);
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(cate);
    });
  });
  it("if we give data in provider, those categories will be marker", () => {
    const props = fakeBooksPageData;
    props.filters.categories = ["classic", "habits"];
    render(<CustomParent {...props} />);
    expect(screen.getByTestId("filterCategoryInput_classic")).toBeChecked();
    expect(screen.getByTestId("filterCategoryInput_habits")).toBeChecked();

    categories.forEach((cate) => {
      if (cate !== "classic" && cate !== "habits") {
        expect(
          screen.getByTestId(`filterCategoryInput_${cate}`)
        ).not.toBeChecked();
      }
    });
  });

  it("change it manually", () => {
    const props = fakeBooksPageData;
    props.filters.categories = ["history", "psychology"];
    render(<CustomParent {...props} />);
    const psy = screen.getByTestId("filterCategoryInput_psychology");
    const history = screen.getByTestId("filterCategoryInput_history");
    expect(psy).toBeChecked();
    expect(history).toBeChecked();

    fireEvent.click(history);
    expect(history).not.toBeChecked();
    fireEvent.click(history);
    expect(history).toBeChecked();

    fireEvent.click(psy);
    expect(psy).not.toBeChecked();
  });
});
