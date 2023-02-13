import { useDispatch } from "react-redux";
import categories from "src/shared/allCategories";
import {
  addCategoryFromFilter,
  removeCategoryFromFilter,
} from "src/store/books/booksStore";
import { useBooksStore } from "src/store/books/booksStoreHooks";
import Text from "../typography/typography";
import style from "./filterCategories.module.css";

const FilterCategories = () => {
  const dispatch = useDispatch();
  const selectedCategories = useBooksStore((s) => s.filters.categories);
  const handleClick = (categoryName: CategoriesType, isExist: boolean) => {
    if (isExist) {
      dispatch(removeCategoryFromFilter(categoryName));
    } else {
      dispatch(addCategoryFromFilter(categoryName));
    }
  };
  return (
    <div data-testid="booksFilterCategoryHolder" className={style.holder}>
      {categories.map((category) => {
        return (
          <div
            key={category}
            data-testid={`booksFilterCategoryItem_${category}`}
            onClick={() => {
              handleClick(category, selectedCategories.includes(category));
            }}
            className={style.categoryItem}
          >
            <Text className={style.categoryText} variant="titleMedium">
              {category}
            </Text>
            <input
              readOnly
              data-testid={`booksFilterCategoryInput_${category}`}
              checked={selectedCategories.includes(category)}
              type={"checkbox"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FilterCategories;
