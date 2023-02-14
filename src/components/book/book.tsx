import Image from "next/image";
import IconCart from "src/assets/icons/iconCart";
import useFetch from "src/hooks/useFetch";
import useUpdateUserData from "src/hooks/useUpdateUserData";
import { useBookStore } from "src/store/book/bookStoreHooks";
import addToCart, { loaderMsg } from "src/utils/addToCart";
import loader from "src/utils/imageLoader";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./book.module.css";

const Book = () => {
  const [trigger, state, msg] = useFetch([addToCart], [loaderMsg]);
  const updateUserData = useUpdateUserData();
  const { name, image, author, description, price } = useBookStore(
    (s) => s.book
  );
  const performAddToCart = async () => {
    const res = await trigger(0);
    if (res.status) {
      //update user data!(cart number and ...)
      await updateUserData();
    }
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
  );
};

export default Book;
