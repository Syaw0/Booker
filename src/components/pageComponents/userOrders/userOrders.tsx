import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserOrdersStore } from "src/store/userOrders/userOrdersStoreHooks";
import style from "./userOrders.module.css";

const UserOrders = () => {
  const { orders } = useUserOrdersStore((s) => s);
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.ordersHolder}></UserDashBase>
      <Footer />
    </div>
  );
};

export default UserOrders;
