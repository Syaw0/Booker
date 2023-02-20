import { book1, book2, book3, book4 } from "./fakeBooks";
import { fakeUser } from "./fakeUser";

const fakeUserWishlistPageData: UserWishlistPagePropsTypes = {
  isLogin: true,
  menuItems: [],
  wishlist: [book1, book2, book3, book4],
  navbarItems: [],
  actionType: "userWishlist",
  user: fakeUser,
};

export default fakeUserWishlistPageData;
