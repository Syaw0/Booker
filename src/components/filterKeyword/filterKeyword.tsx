import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setKeyword } from "src/store/books/booksStore";
import { useBooksStore } from "src/store/books/booksStoreHooks";
import TextInput from "../input/text/textInput";
import style from "./filterKeyword.module.css";

const FilterKeyword = () => {
  const dispatch = useDispatch();
  const keyword = useBooksStore((s) => s.filters.keyword);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(setKeyword(value));
  };
  return (
    <div data-testid="booksFilterKeywordHolder" className={style.holder}>
      <TextInput
        className={style.input}
        value={keyword}
        onChange={handleChange}
        type="text"
        id="booksKeywordInput"
        testId="booksKeywordInput"
        placeholder="Book name , Author , Year of publish..."
      />
    </div>
  );
};

export default FilterKeyword;
