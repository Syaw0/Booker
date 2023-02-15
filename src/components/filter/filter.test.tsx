import Filter from "./filter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "src/store/books/booksStore";
import fakeBooksPageData from "src/shared/fakeBooksPageData";
import getFilteredBooks from "src/utils/getFilteredBooks";
import categories from "src/shared/allCategories";
import { book1 } from "src/shared/fakeBooks";
import { act } from "react-dom/test-utils";

jest.mock("src/utils/getFilteredBooks");
const mockGetFilteredBooks = getFilteredBooks as jest.Mock;

const CustomParent = (props: BooksPagePropsTypes) => {
  return (
    <Provider store={makeStore(props)}>
      <Filter />
    </Provider>
  );
};

const fakeProps: BooksPagePropsTypes = {
  ...fakeBooksPageData,
  filters: {
    categories: [],
    keyword: "",
    priceRange: {
      max: "",
      min: "",
    },
  },
};

describe("Test Component : Filter", () => {
  it("its render properly", () => {
    render(<CustomParent {...fakeProps} />);
    expect(screen.getByTestId("booksFilterHolder")).toBeInTheDocument();
    expect(screen.getByTestId("booksFilterKeywordHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("booksFilterPriceRangeHolder")
    ).toBeInTheDocument();
    expect(screen.getByTestId("booksFilterCategoryHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("booksFilterApplyFilterButton")
    ).toBeInTheDocument();
  });

  it("if filters are empty then if click on the apply show error", () => {
    render(<CustomParent {...fakeProps} />);
    const apply = screen.getByTestId("booksFilterApplyFilterButton");
    fireEvent.click(apply);
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    expect(screen.getByTestId("errorMessage")).toHaveTextContent(
      "filters are empty!"
    );
  });

  it("change filter and click on the apply", async () => {
    render(<CustomParent {...fakeProps} />);
    mockGetFilteredBooks.mockReturnValueOnce(
      new Promise((res) => res({ status: false, msg: "error from server" }))
    );
    mockGetFilteredBooks.mockReturnValueOnce(
      new Promise((res) => res({ status: true, msg: "update", data: [book1] }))
    );
    const apply = screen.getByTestId("booksFilterApplyFilterButton");
    fireEvent.change(screen.getByTestId("booksKeywordInput"), {
      target: { value: "siaw" },
    });
    await act(async () => fireEvent.click(apply));
    expect(mockGetFilteredBooks).toBeCalledTimes(1);

    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toHaveTextContent(
        "error from server"
      )
    );
    await act(async () => fireEvent.click(apply));
    expect(mockGetFilteredBooks).toBeCalledTimes(2);

    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toHaveTextContent("update")
    );
  });

  it("if provider pass filter data , this data will paste into view", async () => {
    const props = fakeProps;
    props.filters.categories = ["Mystery", "fiction", "novel"];
    props.filters.keyword = "HELLO";
    props.filters.priceRange = { max: 10, min: 0 };
    render(<CustomParent {...props} />);
    expect(screen.getByTestId("booksKeywordInput")).toHaveValue(
      props.filters.keyword
    );
    expect(screen.getByTestId("booksFilterMinInput")).toHaveValue(
      `${props.filters.priceRange.min}`
    );
    expect(screen.getByTestId("booksFilterMaxInput")).toHaveValue(
      `${props.filters.priceRange.max}`
    );
    categories.forEach((cate) => {
      if (cate !== "Mystery" && cate !== "fiction" && cate !== "novel") {
        expect(
          screen.getByTestId(`booksFilterCategoryInput_${cate}`)
        ).not.toBeChecked();
      } else {
        expect(
          screen.getByTestId(`booksFilterCategoryInput_${cate}`)
        ).toBeChecked();
      }
    });
  });

  describe("test max and min filter inputs", () => {
    beforeEach(() => {
      const props = fakeProps;
      props.filters.keyword = "HELLO";
      render(<CustomParent {...props} />);
    });
    it("if any of max and min have NaN value return error on click on the apply", () => {
      mockGetFilteredBooks.mockClear();
      const max = screen.getByTestId("booksFilterMaxInput");
      const min = screen.getByTestId("booksFilterMinInput");
      const apply = screen.getByTestId("booksFilterApplyFilterButton");
      fireEvent.change(max, { target: { value: "sss" } });
      fireEvent.click(apply);
      expect(mockGetFilteredBooks).toBeCalledTimes(0);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      expect(screen.getByTestId("errorMessage")).toHaveTextContent(
        "the max and min most be type of number!"
      );
    });
    it("max must bigger than min ", () => {
      mockGetFilteredBooks.mockClear();
      const max = screen.getByTestId("booksFilterMaxInput");
      const min = screen.getByTestId("booksFilterMinInput");
      const apply = screen.getByTestId("booksFilterApplyFilterButton");
      fireEvent.change(max, { target: { value: "2" } });
      fireEvent.change(min, { target: { value: "3" } });
      fireEvent.click(apply);
      expect(mockGetFilteredBooks).toBeCalledTimes(0);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      expect(screen.getByTestId("errorMessage")).toHaveTextContent(
        "the max most greeter than min!"
      );
    });
    it("max and min must be positive ", () => {
      mockGetFilteredBooks.mockClear();
      const max = screen.getByTestId("booksFilterMaxInput");
      const min = screen.getByTestId("booksFilterMinInput");
      const apply = screen.getByTestId("booksFilterApplyFilterButton");
      fireEvent.change(max, { target: { value: "-2" } });
      fireEvent.click(apply);
      expect(mockGetFilteredBooks).toBeCalledTimes(0);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      expect(screen.getByTestId("errorMessage")).toHaveTextContent(
        "use Positive Value For Min And Max!"
      );
      fireEvent.change(max, { target: { value: "2" } });
      fireEvent.change(min, { target: { value: "-3" } });
      fireEvent.click(apply);
      expect(mockGetFilteredBooks).toBeCalledTimes(0);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      expect(screen.getByTestId("errorMessage")).toHaveTextContent(
        "use Positive Value For Min And Max!"
      );
    });
    it("correct example ", async () => {
      mockGetFilteredBooks.mockClear();
      mockGetFilteredBooks.mockReturnValue(
        new Promise((res) => res({ status: true, msg: "okay", data: [book1] }))
      );
      const max = screen.getByTestId("booksFilterMaxInput");
      const min = screen.getByTestId("booksFilterMinInput");
      const apply = screen.getByTestId("booksFilterApplyFilterButton");
      fireEvent.change(max, { target: { value: "11" } });
      await act(async () => fireEvent.click(apply));
      await waitFor(() => expect(screen.getByTestId("successMessage")));
      expect(mockGetFilteredBooks).toBeCalledTimes(1);

      fireEvent.change(max, { target: { value: "0" } });
      fireEvent.change(min, { target: { value: "11" } });
      await act(async () => fireEvent.click(apply));
      // await waitFor(() => expect(screen.getByTestId("waitMessage")));
      await waitFor(() => expect(screen.getByTestId("successMessage")));
      expect(mockGetFilteredBooks).toBeCalledTimes(2);

      fireEvent.change(max, { target: { value: "123" } });
      fireEvent.change(min, { target: { value: "11" } });
      await act(async () => fireEvent.click(apply));
      // await waitFor(() => expect(screen.getByTestId("waitMessage")));
      await waitFor(() => expect(screen.getByTestId("successMessage")));
      expect(mockGetFilteredBooks).toBeCalledTimes(3);
    });
  });
});
