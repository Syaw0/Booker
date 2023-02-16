import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userAddresses.module.css";
const UserAddresses = () => {
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.addressesHolder}></UserDashBase>
      <Footer />
    </div>
  );
};

export default UserAddresses;
