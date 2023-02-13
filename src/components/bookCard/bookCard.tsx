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
      data-testid={`bookCartHolder_${bookId}`}
      onClick={goTo}
      className={style.holder}
    >
      <div data-testid="bookCartImageHolder" className={style.imageHolder}>
        <Image
          width={150}
          height={200}
          alt={name}
          src={image}
          loader={loader}
        />
      </div>

      <div data-testid="bookCartInformation" className={style.bookInfo}>
        <Text
          testid="bookCartName"
          className={style.bookName}
          variant="titleMedium"
        >
          {name}
        </Text>
        <Text
          testid="bookCartAuthor"
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
