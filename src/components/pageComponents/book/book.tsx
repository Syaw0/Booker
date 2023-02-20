import Book from "src/components/book/book";
import BookIntroducer from "src/components/bookIntroducer/bookIntroducer";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import { useBookStore } from "src/store/book/bookStoreHooks";
import style from "./book.module.css";
const BookParticle = () => {
  const similarBooks = useBookStore((s) => s.booksIntroducers.similar);
  return (
    <div data-testid="bookPageHolder" className={style.holder}>
      <Navbar />
      <Book />
      <div data-testid="bookPageIntroducer" className={style.introducers}>
        <BookIntroducer {...similarBooks} />
      </div>
      <Footer />
    </div>
  );
};

export default BookParticle;
