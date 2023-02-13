import FilterCategories from "../filterCategories/filterCategories";
import FilterKeyword from "../filterKeyword/filterKeyword";
import FilterPriceRange from "../filterPriceRange/filterPriceRange";
import Text from "../typography/typography";
import style from "./filter.module.css";

const Filter = () => {
  return (
    <div className={style.holder}>
      <div className={style.filterItem}>
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
    </div>
  );
};

export default Filter;
