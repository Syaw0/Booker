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
    expect(screen.getByTestId("booksFilterCategoryHolder")).toBeInTheDocument();
    categories.forEach((cate) => {
      const item = screen.getByTestId(`booksFilterCategoryItem_${cate}`);
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(cate);
    });
  });
  it("if we give data in provider, those categories will be marker", () => {
    const props = fakeBooksPageData;
    props.filters.categories = [categories[0], categories[1]];
    render(<CustomParent {...props} />);
    expect(
      screen.getByTestId(`booksFilterCategoryInput_${categories[0]}`)
    ).toBeChecked();
    expect(
      screen.getByTestId(`booksFilterCategoryInput_${categories[1]}`)
    ).toBeChecked();

    categories.forEach((cate) => {
      if (cate !== categories[0] && cate !== categories[1]) {
        expect(
          screen.getByTestId(`booksFilterCategoryInput_${cate}`)
        ).not.toBeChecked();
      }
    });
  });

  it("change it manually", () => {
    const props = fakeBooksPageData;
    props.filters.categories = [categories[0], categories[1]];
    render(<CustomParent {...props} />);
    const psy = screen.getByTestId(`booksFilterCategoryInput_${categories[0]}`);
    const history = screen.getByTestId(
      `booksFilterCategoryInput_${categories[0]}`
    );
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
