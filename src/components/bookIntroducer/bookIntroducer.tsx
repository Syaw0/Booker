import Link from "next/link";
import { useEffect, useRef, WheelEvent } from "react";
import IconArrowRight from "src/assets/icons/iconArrowRight";
import BookCard from "../bookCard/bookCard";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./bookIntroducer.module.css";

const BookIntroducer = ({
  introducingName,
  hrefToAllBooks,
  books,
}: BookIntroducerPropsType) => {
  const bookHolderRef: any = useRef(null);
  const ref: any = useRef(null);

  const handleWell = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let bookHolder = bookHolderRef.current as HTMLDivElement;
    const { deltaY } = e;
    const { scrollLeft } = bookHolder;
    // const direction = e.deltaY < 0 ? -1 : +1;
    // bookHolder.scrollTo({
    //   left: bookHolder.scrollLeft + bookHolder.offsetWidth * direction,
    //   behavior: "smooth",
    // });
    bookHolder.scrollTo({
      left: scrollLeft + deltaY * 2,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const div = ref.current as HTMLDivElement;
    div.addEventListener("wheel", handleWell, { passive: false });
  }, []);
  return (
    <div
      data-testid={`bookIntroducer_${introducingName}`}
      className={style.holder}
    >
      <div className={style.top}>
        <Text
          testid="bookIntroducerName"
          variant="headlineLarge"
          className={style.introducingName}
        >
          {introducingName}
        </Text>
        <Link data-testid="bookIntroducerSeeAllAnchor" href={hrefToAllBooks}>
          <Button
            testid="bookIntroducerSeeAllButton"
            className={style.seeAllButton}
            variant="shadow"
            EndIcon={IconArrowRight}
          >
            See All
          </Button>
        </Link>
      </div>
      <div ref={bookHolderRef} className={style.bottom}>
        <div
          ref={ref}
          data-testid="bookIntroducerBooksHolder"
          className={style.bookHolder}
        >
          {books.map((book) => {
            return <BookCard {...book} key={book.bookId} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BookIntroducer;
