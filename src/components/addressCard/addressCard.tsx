import IconTruck from "src/assets/icons/iconTruck";
import Menu from "../menu/menu";
import Text from "../typography/typography";
import style from "./addressCard.module.css";

const AddressCard = ({
  city,
  country,
  receiverName,
  state,
  street,
  tel,
  title,
  zipCode,
}: Address) => {
  return (
    <div className={style.holder}>
      <div className={style.left}>
        <Text className={style.title}>{title}</Text>
        <Text
          className={style.fullAddress}
        >{`${country} - ${state} - ${city} - ${street}`}</Text>
      </div>

      <div className={style.right}>
        <Menu className={style.menu} items={[{ text: "Edit", onClick() {} }]} />
        <div className={style.rightItemHolder}>
          <div className={style.item}>
            <IconTruck width="24" height="24" />
            <Text>{`${state} - ${city}`}</Text>
          </div>

          <div className={style.item}>
            <IconTruck width="24" height="24" />
            <Text>{zipCode}</Text>
          </div>

          <div className={style.item}>
            <IconTruck width="24" height="24" />
            <Text>{tel}</Text>
          </div>

          <div className={style.item}>
            <IconTruck width="24" height="24" />
            <Text>{receiverName}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
