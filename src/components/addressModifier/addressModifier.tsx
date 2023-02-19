import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import useFetch from "src/hooks/useFetch";
import { updateAddress } from "src/store/userAddAddress/userAddAddress";
import { useUserAddAddressStore } from "src/store/userAddAddress/userAddAddressStoreHooks";
import addAddress, { loaderMsg } from "src/utils/addAddress";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import changeAddress, {
  loaderMsg as changeAddressLoaderMsg,
} from "src/utils/changeAddress";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./addressModifier.module.css";

const AddressModifier = ({ isEdit }: { isEdit: boolean }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [trigger, type, msg, setMsg] = useFetch(
    [addAddress, changeAddress],
    [loaderMsg, changeAddressLoaderMsg]
  );
  const addressData = useUserAddAddressStore((s) => s.address);
  const { city, country, receiverName, state, street, tel, title, zipCode } =
    addressData;
  const { userId } = useUserAddAddressStore((s) => s.user);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: isEdit
        ? "userEditAddress/updateAddress"
        : "userAddAddress/updateAddress",
      payload: { [name]: value },
    });
  };
  const performAddAddress = async () => {
    if (!checkInputs()) {
      return;
    }
    let result;
    if (isEdit) {
      result = await trigger(1, addressData);
    } else {
      result = await trigger(0, userId, addressData);
    }
    if (result.status) {
      router.replace("/user/addresses");
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(addressData)) {
      return setMsg("error", "inputs must be filled!");
    }
    return true;
  };

  return (
    <div data-testid="addressModifierHolder" className={style.holder}>
      <Text testid="addressModifierHeadText" className={style.headText}>
        {isEdit ? "Editing Address" : "Adding New Address"}
      </Text>

      <div className={style.inputHolder}>
        <div>
          <TextInput
            testId="addingAddressTitle"
            id="addingAddressTitle"
            label="Address Title"
            type="text"
            name="title"
            placeholder="your address title"
            value={title}
            onChange={changeHandler}
          />
          <TextInput
            testId="addingAddressReceiverName"
            id="addingAddressReceiverName"
            label="Receiver Name"
            type="text"
            name="receiverName"
            placeholder="who receive the book?..."
            value={receiverName}
            onChange={changeHandler}
          />
        </div>
        <div>
          <TextInput
            testId="addingAddressCountry"
            id="addingAddressCountry"
            label="Country"
            type="text"
            name="country"
            placeholder="write your country..."
            value={country}
            onChange={changeHandler}
          />
          <TextInput
            testId="addingAddressState"
            id="addingAddressState"
            label="State"
            type="text"
            name="state"
            placeholder="write state of your country..."
            value={state}
            onChange={changeHandler}
          />
        </div>

        <div>
          <TextInput
            testId="addingAddressCity"
            id="addingAddressCity"
            label="City"
            type="text"
            name="city"
            placeholder="write your City..."
            value={city}
            onChange={changeHandler}
          />
          <TextInput
            testId="addingAddressZipCode"
            id="addingAddressZipCode"
            label="ZipCode"
            type="text"
            name="zipCode"
            placeholder="write your zipCode..."
            value={zipCode}
            onChange={changeHandler}
          />
        </div>
        <div>
          <TextInput
            testId="addingAddressStreet"
            id="addingAddressStreet"
            label="Street"
            type="text"
            name="street"
            placeholder="write which street you living in..."
            value={street}
            onChange={changeHandler}
          />
        </div>
        <div>
          <TextInput
            testId="addingAddressTel"
            id="addingAddressTel"
            label="Tel"
            type="text"
            name="tel"
            placeholder="write your tel..."
            value={tel}
            onChange={changeHandler}
          />
        </div>
      </div>
      <Button
        testid="addressModifierButton"
        onClick={performAddAddress}
        className={style.addAddressButton}
      >
        {isEdit ? "Update Address" : "Add Address"}
      </Button>
      <Message type={type} msg={msg} />
    </div>
  );
};

export default AddressModifier;
