import Image from "next/image";
import { useState } from "react";
import IconBookmark from "src/assets/icons/iconBookmark";
import IconBookmarkFilled from "src/assets/icons/iconBookmarkFilled";
import IconCart from "src/assets/icons/iconCart";
import useFetch from "src/hooks/useFetch";
import useUpdateUserData from "src/hooks/useUpdateUserData";
import { useBookStore } from "src/store/book/bookStoreHooks";
import addToCart, { loaderMsg } from "src/utils/addToCart";
import bookmarkModifier, {
  loaderMsg as bookmarkModifierLoaderMsg,
} from "src/utils/bookmarkModifier";
import loader from "src/utils/imageLoader";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./book.module.css";

const Book = () => {
  const [trigger, state, msg] = useFetch(
    [addToCart, bookmarkModifier],
    [loaderMsg, bookmarkModifierLoaderMsg]
  );
  const [isLock, setIsLock] = useState(false);
  const { name, image, author, description, price, bookId } = useBookStore(
    (s) => s.book
  );

  const { wishlist, userId } = useBookStore((s) => s.user);
  const updateUserData = useUpdateUserData(userId);
  const isBookMarked = wishlist.filter((s) => s == bookId).length != 0;
  const performAddToCart = async () => {
    const res = await trigger(0);
    if (res.status) {
      //update user data!(cart number and ...)
      await updateUserData();
    }
  };

  const handleBookmark = async () => {
    if (isLock) {
      return;
    }
    setIsLock(true);
    const result = await trigger(1, userId, wishlist, bookId, isBookMarked);

    if (result.status) {
      await updateUserData();
    }
    setIsLock(false);
  };
  return (
    <div data-testid="bookHolder" className={style.holder}>
      <div data-testid="bookImageHolder" className={style.left}>
        <Image
          className={style.image}
          width={200}
          height={250}
          src={image}
          loader={loader}
          alt={name}
        />
      </div>

      <div className={style.right}>
        <div className={style.rightTop}>
          <Text testid="bookName" className={style.name} variant="displayLarge">
            {name}
          </Text>
          <Text
            testid="bookAuthor"
            className={style.author}
            variant="displaySmall"
          >
            {author}
          </Text>
          <Text
            testid="bookDescription"
            className={style.desc}
            variant="titleLarge"
          >
            {description}
          </Text>
        </div>
        <div className={style.rightBottom}>
          <Text
            testid="bookPrice"
            className={style.price}
            variant="displayMedium"
          >
            {price}$
          </Text>

          <div className={style.buttonHolder}>
            {isBookMarked ? (
              <IconBookmarkFilled
                data-testid="bookPageFilledBookmarkIcon"
                onClick={handleBookmark}
                width="24"
                height="24"
              />
            ) : (
              <IconBookmark
                data-testid="bookPageBookmarkIcon"
                onClick={handleBookmark}
                width="24"
                height="24"
              />
            )}

            <Button
              loader={state == "loader"}
              onClick={performAddToCart}
              testid="bookAddToCartButton"
              className={style.addButton}
              EndIcon={IconCart}
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
