import { useRouter } from "next/router";
import IconPlus from "src/assets/icons/iconPlus";
import AddressCard from "src/components/addressCard/addressCard";
import Button from "src/components/button/button";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserAddressesStore } from "src/store/userAddresses/userAddressesStoreHooks";
import style from "./userAddresses.module.css";
const UserAddresses = () => {
  const router = useRouter();
  const { addresses } = useUserAddressesStore((s) => s);
  const addAddress = () => {
    router.replace("/user/addresses/add");
  };
  return (
    <div data-testid="userAddressesPage" className={style.holder}>
      <Navbar />
      <UserDashBase className={style.addressesHolder}>
        <div className={style.buttonHolder}>
          <Button
            testid="userAddressesAddAddressButton"
            onClick={addAddress}
            StartIcon={IconPlus}
            className={style.addAddressButton}
          >
            <span className={style.addAddressButtonText}>AddAddress</span>
          </Button>
        </div>
        {addresses.map((address) => {
          return <AddressCard key={address.title} {...address} />;
        })}
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserAddresses;
