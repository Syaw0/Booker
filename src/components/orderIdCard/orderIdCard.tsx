import Image from "next/image";
import loader from "src/utils/imageLoader";
import Text from "../typography/typography";
import style from "./orderIdCard.module.css";

const OrderIdCard = ({
  image,
  name,
  price,
  author,
  bookId,
  num,
}: BookCartCardPropsType) => {
  return (
    <div data-testid={`OrderIdCard_${bookId}`} className={style.holder}>
      <div className={style.left}>
        <Image
          data-testid="OrderIdCardImage"
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
              testid="OrderIdCardName"
              className={style.name}
              variant="headlineMedium"
            >
              {name}
              <Text as="span" className={style.num}>{`(*${num})`}</Text>
            </Text>
            <Text
              testid="OrderIdCardAuthor"
              className={style.author}
              variant="labelLarge"
            >
              {author}
            </Text>
          </div>
        </div>
        <div className={style.rightBottom}>
          <Text
            testid="OrderIdCardTotalPrice"
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

export default OrderIdCard;
