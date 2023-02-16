import AddressModifier from "src/components/addressModifier/addressModifier";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import Text from "src/components/typography/typography";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userEditAddress.module.css";
const UserEditAddress = () => {
  return (
    <div data-testid="userEditAddressPageHolder" className={style.holder}>
      <Navbar />
      <UserDashBase className={style.editAddressHolder}>
        <div className={style.left}>
          <AddressModifier isEdit={true} />
        </div>
        <div
          data-testid="userEditAddressPageNoteHolder"
          className={style.right}
        >
          {/* //TODO add limit to inputs and some notes in this div */}
          <Text variant="headlineSmall">Some Tips</Text>
        </div>
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserEditAddress;
