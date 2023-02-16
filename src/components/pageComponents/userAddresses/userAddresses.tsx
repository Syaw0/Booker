import AddressCard from "src/components/addressCard/addressCard";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserAddressesStore } from "src/store/userAddresses/userAddressesStoreHooks";
import style from "./userAddresses.module.css";
const UserAddresses = () => {
  const { addresses } = useUserAddressesStore((s) => s);
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.addressesHolder}>
        {addresses.map((address) => {
          return <AddressCard key={address.title} {...address} />;
        })}
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserAddresses;
