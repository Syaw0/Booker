import AddressModifier from "src/components/addressModifier/addressModifier";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import Text from "src/components/typography/typography";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userAddAddress.module.css";
const UserAddAddress = () => {
  return (
    <div data-testid="userAddAddressPageHolder" className={style.holder}>
      <Navbar />
      <UserDashBase className={style.addAddressHolder}>
        <div className={style.left}>
          <AddressModifier isEdit={false} />
        </div>
        <div data-testid="userAddAddressPageNoteHolder" className={style.right}>
          {/* //TODO add limit to inputs and some notes in this div */}
          <Text variant="headlineSmall">Some Tips</Text>
        </div>
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserAddAddress;
