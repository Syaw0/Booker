import CartCard from "src/components/cartCard/cartCard";
import CartPriceSummary from "src/components/cartPriceSummary/cartPriceSummary";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserCartStore } from "src/store/userCart/userCartStoreHooks";
import style from "./userCart.module.css";

const UserCart = () => {
  const { addresses, books, priceSummary } = useUserCartStore((s) => s);
  return (
    <div data-testid="userCartPage" className={style.holder}>
      <Navbar />
      <UserDashBase className={style.bottomHolder}>
        <div className={style.left}>
          {books.map((book) => (
            <CartCard key={book.bookId} {...book} />
          ))}
        </div>
        <div className={style.right}>
          <CartPriceSummary addresses={addresses} priceSummary={priceSummary} />
        </div>
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserCart;
