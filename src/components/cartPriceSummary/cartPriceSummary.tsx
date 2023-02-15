import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import useFetch from "src/hooks/useFetch";
import pay, { loaderMsg } from "src/utils/pay";
import Button from "../button/button";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./cartPriceSummary.module.css";

const CartPriceSummary = ({
  addresses,
  priceSummary,
}: Pick<UserCartPagePropsTypes, "addresses" | "priceSummary">) => {
  const router = useRouter();
  const [trigger, state, msg, setMsg] = useFetch([pay], [loaderMsg]);
  const [address, setAddress] = useState("");
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setAddress(value);
  };
  const performPay = async () => {
    if (address.trim() === "") {
      return setMsg("error", "You must add an Address!");
    }
    const result = await trigger(0);
  };
  const goToAddresses = () => {
    router.replace("/user/addresses");
  };
  return (
    <div className={style.holder}>
      <div className={style.information}>
        {/* //TODO can refactor this? */}
        <Text className={style.headText}>Result</Text>
        <div className={style.informationItems}>
          <Text>SubTotal</Text>
          <Text>{priceSummary.subTotal}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Tax</Text>
          <Text>{priceSummary.tax}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Shipping</Text>
          <Text>{priceSummary.shipping}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Total</Text>
          <Text>{priceSummary.total}</Text>
        </div>
      </div>

      <div className={style.address}>
        <Text className={style.headText}>Address</Text>
        <select
          onChange={handleSelectChange}
          value={address}
          className={style.select}
        >
          {addresses.map((add) => {
            return <option key={add.title}>{add.title}</option>;
          })}
          <option selected></option>
        </select>
        <Text
          onClick={goToAddresses}
          variant="labelLarge"
          className={style.addNewAddressButton}
        >
          Add new address or edit exist
        </Text>
      </div>

      <div className={style.buttonHolder}>
        <Button onClick={performPay} className={style.button}>
          Pay Now
        </Button>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default CartPriceSummary;
