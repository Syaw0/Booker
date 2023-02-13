import FilterKeyword from "../filterKeyword/filterKeyword";
import FilterPriceRange from "../filterPriceRange/filterPriceRange";
import TextInput from "../input/text/textInput";
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
    </div>
  );
};

export default Filter;
