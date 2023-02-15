import CartCard from "src/components/cartCard/cartCard";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserCartStore } from "src/store/userCart/userCartStoreHooks";
import style from "./userCart.module.css";

const UserCart = () => {
  const cartBooks = useUserCartStore((s) => s.books);
  return (
    <div className={style.holder}>
      <Navbar />
      <UserDashBase className={style.bottomHolder}>
        <div className={style.left}>
          {cartBooks.map((book) => (
            <CartCard {...book} />
          ))}
        </div>
        <div className={style.right}>s</div>
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserCart;
