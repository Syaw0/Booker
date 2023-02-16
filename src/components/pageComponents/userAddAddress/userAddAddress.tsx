import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userAddAddress.module.css";
const UserAddAddress = () => {
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.addAddressHolder}></UserDashBase>
      <Footer />
    </div>
  );
};

export default UserAddAddress;
