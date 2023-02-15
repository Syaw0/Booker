import Image from "next/image";
import { useRouter } from "next/router";
import IconArrowRight from "src/assets/icons/iconArrowRight";
import loader from "src/utils/imageLoader";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./orderCart.module.css";

const OrderCart = ({ books, date, orderId, state, priceSummary }: Order) => {
  const router = useRouter();
  const goToOrder = () => {
    router.replace(`/user/orders/${orderId}`);
  };
  return (
    <div data-testid={`order_${orderId}`} className={style.holder}>
      <div className={style.top}>
        <div>
          <Text testid="orderOrderId" className={style.orderId}>
            #{orderId}
          </Text>
          <Text testid="orderDate" className={style.date}>
            {date}
          </Text>
        </div>
        <div>
          <Text testid="orderState" className={style.state}>
            {state}
          </Text>
          <Text testid="orderTotalPrice" className={style.totalPrice}>
            {priceSummary.total}$
          </Text>
        </div>
      </div>

      <div className={style.bottom}>
        <div>
          <div className={style.imageHolder}>
            {books.map((book, i) => {
              if (i > 3) {
                return;
              }
              return (
                <Image
                  data-testid={`orderImage_${i}`}
                  key={`${book.bookId}_${i}`}
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
          <Text
            testid="orderRestBookNumber"
            className={style.bottomRestBookNumber}
          >
            {books.length - 4 <= 0 ? "" : `And +${books.length - 4} books`}
          </Text>
        </div>
        <div className={style.buttonHolder}>
          <Button
            testid="orderSeeDetailButton"
            onClick={goToOrder}
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
