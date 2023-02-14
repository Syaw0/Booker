import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import style from "./userCart.module.css";

const UserCart = () => {
  return (
    <div className={style.holder}>
      <Navbar />
      <Footer />
    </div>
  );
};

export default UserCart;
