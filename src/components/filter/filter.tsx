import FilterKeyword from "../filterKeyword/filterKeyword";
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
    </div>
  );
};

export default Filter;
