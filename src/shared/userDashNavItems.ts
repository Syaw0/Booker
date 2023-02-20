import IconAddress from "src/assets/icons/iconAddress";
import IconBookmark from "src/assets/icons/iconBookmark";
import IconCart from "src/assets/icons/iconCart";
import IconSetting from "src/assets/icons/iconSetting";
import IconTruck from "src/assets/icons/iconTruck";

const navItems = [
  { href: "/user/cart", name: "Cart" },
  { href: "/user/orders", name: "Orders" },
  { href: "/user/addresses", name: "Addresses" },
  { href: "/user/wishlist", name: "Wishlist" },
  { href: "/user/setting", name: "Setting" },
];

const navIcons: any = {
  Cart: IconCart,
  Orders: IconTruck,
  Addresses: IconAddress,
  Wishlist: IconBookmark,
  Setting: IconSetting,
};

export { navIcons };

export default navItems;
