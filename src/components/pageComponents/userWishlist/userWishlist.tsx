import BookCard from "src/components/bookCard/bookCard";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import UserDashBase from "src/components/userDashBase/userDashBase";
import { useUserWishlistStore } from "src/store/userWishlist/userWishlistStoreHooks";
import style from "./userWishlist.module.css";
const UserWishlist = () => {
  const { wishlist } = useUserWishlistStore((s) => s);

  return (
    <div data-testid="userWishlistPage" className={style.holder}>
      <Navbar />
      <UserDashBase className={style.booksHolder}>
        {wishlist.map((book) => {
          return <BookCard key={book.bookId} {...book} />;
        })}
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserWishlist;
