import Text from "../typography/typography";
import style from "./orderIdSummary.module.css";

const OrderIdSummary = ({
  address,
  priceSummary,
}: Pick<UserCartPagePropsTypes, "priceSummary"> & { address: Address }) => {
  return (
    // TODO God! we must refactor this mess
    <div data-testid="orderIdSummaryHolder" className={style.holder}>
      <div className={style.information}>
        <Text className={style.headText}>Result</Text>
        <div className={style.informationItems}>
          <Text>SubTotal</Text>
          <Text testid="orderIdSummarySubTotal">{priceSummary.subTotal}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Tax</Text>
          <Text testid="orderIdSummaryTax">{priceSummary.tax}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Shipping</Text>
          <Text testid="orderIdSummaryShipping">{priceSummary.shipping}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Total</Text>
          <Text testid="orderIdSummaryTotal">{priceSummary.total}</Text>
        </div>
      </div>

      <div className={style.address}>
        <Text className={style.headText}>Address</Text>
        <div className={style.informationItems}>
          <Text>Receiver</Text>
          <Text testid="orderIdSummaryReceiverName">
            {address.receiverName}
          </Text>
        </div>
        <div className={style.informationItems}>
          <Text>Country</Text>
          <Text testid="orderIdSummaryCountry">{address.country}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>City</Text>
          <Text testid="orderIdSummaryCity">{address.city}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>State</Text>
          <Text testid="orderIdSummaryState">{address.state}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Street</Text>
          <Text testid="orderIdSummaryStreet">{address.street}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>Tel</Text>
          <Text testid="orderIdSummaryTel">{address.tel}</Text>
        </div>
        <div className={style.informationItems}>
          <Text>ZipCode</Text>
          <Text testid="orderIdSummaryZipCode">{address.zipCode}</Text>
        </div>
      </div>
    </div>
  );
};

export default OrderIdSummary;
