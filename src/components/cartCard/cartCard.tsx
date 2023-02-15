import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import IconPlus from "src/assets/icons/iconPlus";
import IconSubtracting from "src/assets/icons/iconSubtracting";
import useFetch from "src/hooks/useFetch";
import { updateStates } from "src/store/userCart/userCart";
import addOneToCart, {
  loaderMsg as addOneLoaderMsg,
} from "src/utils/addOneToCart";
import loader from "src/utils/imageLoader";
import removeAllFromCart, {
  loaderMsg as rmAllLoaderMsg,
} from "src/utils/removeAllFromCart";
import removeOneFromCart, {
  loaderMsg as rmOneLoaderMsg,
} from "src/utils/removeOneFromCart";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./cartCard.module.css";

const CartCard = ({
  image,
  name,
  price,
  author,
  bookId,
  num,
}: BookCartCardPropsType) => {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(false);
  const [trigger] = useFetch(
    [removeAllFromCart, addOneToCart, removeOneFromCart],
    [rmAllLoaderMsg, addOneLoaderMsg, rmOneLoaderMsg]
  );

  // TODO write Hook for this?

  const addOne = async () => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);
    const result = await trigger(1);
    if (result.status) {
      dispatch(updateStates(result.data));
    }
    setIsLocked(false);
  };

  const removeOne = async () => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);
    const result = await trigger(2);
    if (result.status) {
      dispatch(updateStates(result.data));
    }
    setIsLocked(false);
  };

  const removeAll = async () => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);
    const result = await trigger(0);
    if (result.status) {
      dispatch(updateStates(result.data));
    }
    setIsLocked(false);
  };
  return (
    <div data-testid={`cartCardHolder_${bookId}`} className={style.holder}>
      <div className={style.left}>
        <Image
          data-testid="cartCardImage"
          className={style.image}
          src={image}
          alt={name}
          width={200}
          height={270}
          loader={loader}
        />
      </div>
      <div className={style.right}>
        <div className={style.rightTop}>
          <div>
            <Text
              testid="cartCardName"
              className={style.name}
              variant="headlineMedium"
            >
              {name}
            </Text>
            <Text
              testid="cartCardAuthor"
              className={style.author}
              variant="labelLarge"
            >
              {author}
            </Text>
          </div>
          <Button
            testid="cartCardRemoveAllButton"
            variant="shadow"
            className={style.removeAllButton}
            color="error"
            onClick={removeAll}
          >
            Remove All
          </Button>
        </div>
        <div className={style.rightBottom}>
          <div className={style.counterHolder}>
            <div data-testid="cartCardRemoveOneButton" onClick={removeOne}>
              <IconSubtracting width="24" height="24" />
            </div>
            <div>
              <Text
                testid="cartCardCountNumber"
                className={style.counterCount}
                variant="titleLarge"
              >
                {num}
              </Text>
            </div>
            <div data-testid="cartCardAddOneButton" onClick={addOne}>
              <IconPlus width="24" height="24" />
            </div>
          </div>
          <Text
            testid="cartCardTotalPrice"
            className={style.price}
            variant="titleLarge"
          >
            {Number(price) * Number(num)}$
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
