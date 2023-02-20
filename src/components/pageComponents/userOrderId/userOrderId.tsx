import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import OrderIdCard from "src/components/orderIdCard/orderIdCard";
import OrderIdSummary from "src/components/orderIdSummary/orderIdSummary";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserOrderIdStore } from "src/store/userOrderId/userOrderIdStoreHooks";
import style from "./userOrderId.module.css";

const UserOrderId = () => {
  const { order } = useUserOrderIdStore((s) => s);
  return (
    <div data-testid="userOrderIdPage" className={style.holder}>
      <Navbar />

      <UserDashBase className={style.orderHolder}>
        <div className={style.left}>
          {order.books.map((book) => (
            <OrderIdCard key={book.bookId} {...book} />
          ))}
        </div>
        <div className={style.right}>
          <OrderIdSummary
            address={order.address}
            priceSummary={order.priceSummary}
          />
        </div>
      </UserDashBase>

      <Footer />
    </div>
  );
};

export default UserOrderId;
