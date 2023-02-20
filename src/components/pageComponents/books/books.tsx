import { useRef } from "react";
import { useDispatch } from "react-redux";
import IconClose from "src/assets/icons/iconClose";
import IconFilter from "src/assets/icons/iconFilter";
import BookCard from "src/components/bookCard/bookCard";
import Filter from "src/components/filter/filter";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import Text from "src/components/typography/typography";
import { toggleFilterOpening } from "src/store/books/booksStore";
import { useBooksStore } from "src/store/books/booksStoreHooks";
import style from "./books.module.css";

const Books = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const books = useBooksStore((s) => s.books);
  const isFilterOpen = useBooksStore((s) => s.isFilterOpen);

  const toggleFilter = () => {
    isFilterOpen
      ? dispatch(toggleFilterOpening(false))
      : dispatch(toggleFilterOpening(true));
  };
  return (
    <div data-testid="booksPageHolder" className={style.holder}>
      <Navbar />

      <div className={style.middle}>
        <Filter />
        <div className={style.right}>
          <div className={style.top}>
            <Text variant="headlineMedium">Traverse Books</Text>
            <IconFilter
              onClick={toggleFilter}
              className={style.filterIcon}
              width="30"
              height="30"
            />
          </div>
          <div data-testid="booksPageBookHolder" className={style.booksHolder}>
            {books.map((book) => {
              return <BookCard key={book.bookId} {...book} />;
            })}
          </div>
        </div>
        {isFilterOpen && (
          <div ref={ref} className={style.floatFilterHolder}>
            <Filter className={style.floatFilter} />
            <div className={style.filterCloseIcon}>
              <IconClose width="24" height="24" onClick={toggleFilter} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Books;
