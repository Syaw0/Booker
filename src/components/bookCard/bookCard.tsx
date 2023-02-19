import Image from "next/image";
import Link from "next/link";
import loader from "src/utils/imageLoader";
import Text from "../typography/typography";
import style from "./bookCard.module.css";

const BookCard = ({
  name,
  author,
  bookId,
  category,
  image,
}: BookCardPropsType) => {
  return (
    <Link
      data-testid={`bookCardAnchor_${bookId}`}
      href={`/book/${category}/${bookId}`}
    >
      <div data-testid={`bookCardHolder_${bookId}`} className={style.holder}>
        <div data-testid="bookCardImageHolder" className={style.imageHolder}>
          <Image
            width={150}
            height={200}
            alt={name}
            src={`/cover/${bookId}`}
            loader={loader}
          />
        </div>

        <div data-testid="bookCardInformation" className={style.bookInfo}>
          <Text
            testid="bookCardName"
            className={style.bookName}
            variant="titleMedium"
          >
            {name}
          </Text>
          <Text
            testid="bookCardAuthor"
            className={style.authorName}
            variant="titleSmall"
          >
            {author}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
