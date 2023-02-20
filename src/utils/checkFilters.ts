import { RootState } from "src/store/books/booksStore";

const checkFilters = ({ filters }: Pick<RootState, "filters">) => {
  let checkKeyword = filters.keyword.trim() !== "";
  let checkCategory = filters.categories.length !== 0;
  let checkMax =
    !Number.isNaN(Number(filters.priceRange.max)) &&
    Number(filters.priceRange.max) !== 0;
  let checkMin =
    !Number.isNaN(Number(filters.priceRange.min)) &&
    filters.priceRange.min !== "";
  return checkCategory || checkKeyword || checkMax || checkMin;
};
export default checkFilters;
