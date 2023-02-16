import { book1, book2, book3, book4 } from "./fakeBooks";

const fakeUserWishlistPageData: UserWishlistPagePropsTypes = {
  isLogin: true,
  menuItems: [],
  wishlist: [
    book1,
    book2,
    book3,
    book4,
    book2,
    book3,
    book4,
    book2,
    book3,
    book4,
    book2,
    book3,
    book4,
    book2,
    book3,
    book4,
    book2,
    book3,
    book4,
    book2,
    book3,
    book4,
  ],
  navbarItems: [],
  actionType: "userWishlist",
  user: {
    cartNumber: 1,
    email: "",
    profileUrl:
      "https://user-images.githubusercontent.com/90524474/218326887-539649b7-a556-4214-a5a3-3d4e7e541bd2.jpg?w=128&q=50",
    userId: "1",
  },
};

export default fakeUserWishlistPageData;
