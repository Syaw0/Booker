import AddressModifier from "src/components/addressModifier/addressModifier";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import Text from "src/components/typography/typography";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userAddAddress.module.css";
const UserAddAddress = () => {
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.addAddressHolder}>
        <div className={style.left}>
          <AddressModifier isEdit={false} />
        </div>
        <div className={style.right}>
          <Text>Tips</Text>
        </div>
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserAddAddress;
