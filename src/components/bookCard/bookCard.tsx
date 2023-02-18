import Image from "next/image";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const goTo = () => {
    router.replace(`/book/${category}/${bookId}`);
  };
  return (
    <div
      data-testid={`bookCardHolder_${bookId}`}
      onClick={goTo}
      className={style.holder}
    >
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
  );
};

export default BookCard;
