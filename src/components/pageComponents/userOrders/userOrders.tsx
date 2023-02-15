import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import OrderCart from "src/components/orderCart/orderCart";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserOrdersStore } from "src/store/userOrders/userOrdersStoreHooks";
import style from "./userOrders.module.css";

const UserOrders = () => {
  const { orders } = useUserOrdersStore((s) => s);
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.ordersHolder}>
        {orders.map((order) => {
          return <OrderCart key={order.orderId} {...order} />;
        })}
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserOrders;
