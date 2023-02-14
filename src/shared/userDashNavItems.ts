import IconAddress from "src/assets/icons/iconAddress";
import IconBookmark from "src/assets/icons/iconBookmark";
import IconCart from "src/assets/icons/iconCart";
import IconSetting from "src/assets/icons/iconSetting";
import IconTruck from "src/assets/icons/iconTruck";

const navItems = [
  { href: "/user/cart", Icon: IconCart, name: "Cart" },
  { href: "/user/orders", Icon: IconTruck, name: "Orders" },
  { href: "/user/addresses", Icon: IconAddress, name: "Addresses" },
  { href: "/user/wishlist", Icon: IconBookmark, name: "Wishlist" },
  { href: "/user/setting", Icon: IconSetting, name: "Setting" },
];

export default navItems;
