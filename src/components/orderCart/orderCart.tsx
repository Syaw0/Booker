import Image from "next/image";
import IconArrowRight from "src/assets/icons/iconArrowRight";
import loader from "src/utils/imageLoader";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./orderCart.module.css";

const OrderCart = ({ books, date, orderId, state, totalPrice }: Order) => {
  return (
    <div className={style.holder}>
      <div className={style.top}>
        <div>
          <Text className={style.orderId}>#{orderId}</Text>
          <Text className={style.date}>{date}</Text>
        </div>
        <div>
          <Text className={style.state}>{state}</Text>
          <Text className={style.totalPrice}>{totalPrice}$</Text>
        </div>
      </div>

      <div className={style.bottom}>
        <div>
          <div className={style.imageHolder}>
            {books.map((book, i) => {
              if (i == 3) {
                return;
              }
              return (
                <Image
                  key={`${book.bookId}_i`}
                  className={style.image}
                  src={book.image}
                  alt={book.name}
                  width={170}
                  height={230}
                  loader={loader}
                />
              );
            })}
          </div>
          <Text className={style.bottomRestBookNumber}>
            {books.length - 4 <= 0 ? "" : `And +${books.length - 4} books`}
          </Text>
        </div>
        <div>
          <Button
            className={style.seeDetailButton}
            EndIcon={IconArrowRight}
            variant="shadow"
          >
            See Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;
