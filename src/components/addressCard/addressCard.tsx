import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import IconCompass from "src/assets/icons/iconCompass";
import IconEmail from "src/assets/icons/iconEmail";
import IconMail from "src/assets/icons/iconMail";
import IconTel from "src/assets/icons/iconTel";
import useFetch from "src/hooks/useFetch";
import useUpdateAddresses from "src/hooks/useUpdateAddresses";
import { useUserAddressesStore } from "src/store/userAddresses/userAddressesStoreHooks";
import deleteAddress, { loaderMsg } from "src/utils/deleteAddress";
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
  addressId,
}: Address) => {
  const [trigger] = useFetch([deleteAddress], [loaderMsg]);
  const router = useRouter();
  const goToEdit = () => {
    router.replace(`/user/addresses/edit?addressId=${addressId}`);
  };
  const { userId } = useUserAddressesStore((s) => s.user);
  const updateAddresses = useUpdateAddresses(userId);

  const performDeleteAddress = async () => {
    const result = await trigger(0, addressId);
    if (result.status) {
      await updateAddresses();
    }
  };
  return (
    <div data-testid={`addressCard_${title}`} className={style.holder}>
      <div className={style.left}>
        <Text testid="addressCardTitle" className={style.title}>
          {title}
        </Text>
        <Text
          testid="addressCardFullAddress"
          className={style.fullAddress}
        >{`${country} - ${state} - ${city} - ${street}`}</Text>
      </div>

      <div className={style.right}>
        <Menu
          className={style.menu}
          items={[
            { text: "Edit", onClick: goToEdit },
            { text: "Delete", onClick: performDeleteAddress },
          ]}
        />
        <div className={style.rightItemHolder}>
          <div className={style.item}>
            <IconCompass width="24" height="24" />
            <Text testid="addressCardCityAndState">{`${state} - ${city}`}</Text>
          </div>

          <div className={style.item}>
            <IconMail width="24" height="24" />
            <Text testid="addressCardZipCode">{zipCode}</Text>
          </div>

          <div className={style.item}>
            <IconTel width="24" height="24" />
            <Text testid="addressCardTel">{tel}</Text>
          </div>

          <div className={style.item}>
            <IconEmail width="24" height="24" />
            <Text testid="addressCardReceiverName">{receiverName}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
