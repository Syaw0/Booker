import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userCart.module.css";

const UserCart = () => {
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase />
      <Footer />
    </div>
  );
};

export default UserCart;
