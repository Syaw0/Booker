import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import IconDollar from "src/assets/icons/iconDollar";
import { setPriceRange } from "src/store/books/booksStore";
import { useBooksStore } from "src/store/books/booksStoreHooks";
import TextInput from "../input/text/textInput";
import Text from "../typography/typography";
import style from "./filterPriceRange.module.css";

const FilterPriceRange = () => {
  const dispatch = useDispatch();
  const { priceRange } = useBooksStore((s) => s.filters);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "booksFilterMinInput") {
      dispatch(setPriceRange({ min: value }));
    } else {
      dispatch(setPriceRange({ max: value }));
    }
  };
  return (
    <div data-testid="booksFilterPriceRangeHolder" className={style.holder}>
      <TextInput
        value={priceRange.min}
        onChange={handleChange}
        name="booksFilterMinInput"
        type="text"
        placeholder="min"
        id="booksFilterMinInput"
        testId="booksFilterMinInput"
        EndIcon={<IconDollar height="24" width="24" />}
      />
      <Text className={style.separator} variant="titleLarge">
        -
      </Text>
      <TextInput
        value={priceRange.max}
        onChange={handleChange}
        name="booksFilterMaxInput"
        type="text"
        placeholder="max"
        EndIcon={<IconDollar height="24" width="24" />}
        id="booksFilterMaxInput"
        testId="booksFilterMaxInput"
      />
    </div>
  );
};

export default FilterPriceRange;
