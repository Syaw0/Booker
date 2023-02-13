import useFetch from "src/hooks/useFetch";
import { useBooksStore } from "src/store/books/booksStoreHooks";
import checkFilters from "src/utils/checkFilters";
import checkMinAndMax from "src/utils/checkMinAndMaxFilter";
import getFilteredBooks, { loaderMsg } from "src/utils/getFilteredBooks";
import Button from "../button/button";
import FilterCategories from "../filterCategories/filterCategories";
import FilterKeyword from "../filterKeyword/filterKeyword";
import FilterPriceRange from "../filterPriceRange/filterPriceRange";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./filter.module.css";

const Filter = () => {
  const filters = useBooksStore((s) => s.filters);
  const [trigger, state, msg, setMsg] = useFetch(
    [getFilteredBooks],
    [loaderMsg]
  );
  const applyFilter = async () => {
    if (!checkFilters({ filters })) {
      return setMsg("error", "filters are empty!");
    }
    const checkMinAndMaxResult = checkMinAndMax(
      filters.priceRange.min,
      filters.priceRange.max
    );
    if (!checkMinAndMaxResult.status) {
      return setMsg("error", checkMinAndMaxResult.msg);
    }

    const result = await trigger(0);
  };
  return (
    <div data-testid="booksFilterHolder" className={style.holder}>
      <div data-testid="Books" className={style.filterItem}>
        <Text variant="titleLarge" className={style.filterItemText}>
          Keyword
        </Text>
        <FilterKeyword />
      </div>

      <div className={style.filterItem}>
        <Text variant="titleLarge" className={style.filterItemText}>
          Price Range
        </Text>
        <FilterPriceRange />
      </div>

      <div className={style.filterItem}>
        <Text variant="titleLarge" className={style.filterItemText}>
          Categories
        </Text>
        <FilterCategories />
      </div>

      <Button
        testid="booksFilterApplyFilterButton"
        onClick={applyFilter}
        className={style.applyButton}
      >
        Apply Filter
      </Button>
      <Message className={style.message} type={state} msg={msg} />
    </div>
  );
};

export default Filter;
