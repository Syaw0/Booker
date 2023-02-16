import categories from "./shared/allCategories";
import navItems from "./shared/userDashNavItems";

declare global {
  interface IconTypes {
    height: string;
    width: string;
    onClick?(e: any): void;
    id?: string;
    "data-testid"?: string;
    className?: string;
  }
  interface MessageType {
    msg: string;
    type: MessageStateType;
    className?: string;
  }

  type FetchStateTypes = "error" | "success" | "pending" | "loader";
  type MessageStateType = FetchStateTypes | "warn";
  interface FetchResponse {
    status: boolean;
    msg: string;
    data?: any;
  }
  interface BookCardPropsType {
    name: string;
    bookId: string;
    image: string;
    author: string;
    price: string;
    category: CategoriesType;
    description: string;
  }
  interface BookIntroducerPropsType {
    introducingName: string;
    hrefToAllBooks: string;
    books: BookCardPropsType[];
  }

  interface User {
    email: string;
    cartNumber: string | number;
    userId: string;
    profileUrl: string;
    wishlist: string[];
  }

  interface PageMainStates {
    isLogin: boolean;
    user: User;
  }
  interface HomePagePropsTypes extends PageMainStates {
    booksIntroducers: {
      mainIntroducers: BookIntroducerPropsType[];
    };
  }

  type CategoriesType = (typeof categories)[number];

  interface BooksPagePropsTypes extends PageMainStates {
    books: BookCardPropsType[];
    isFilterOpen: boolean;
    filters: {
      keyword: string;
      priceRange: {
        min: string | number;
        max: string | number;
      };
      categories: CategoriesType[];
    };
  }

  interface BookPagePropsTypes extends PageMainStates {
    book: BookCardPropsType;
    booksIntroducers: {
      similar: BookIntroducerPropsType;
    };
  }

  interface UserAddressesPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    addresses: Address[];
  }

  interface UserWishlistPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    wishlist: BookCardPropsType[];
  }

  interface UserAddAddressPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    address: Address;
  }

  interface UserEditAddressPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    address: Address;
  }

  interface UserOrderIdPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    order: Omit<Order, "books"> & { books: BookCartCardPropsType[] };
  }

  type OrderStates = "delivered";
  interface Order {
    date: string;
    state: OrderStates;
    books: BookCardPropsType[];
    priceSummary: UserCartPagePropsTypes["priceSummary"];
    orderId: string;
    address: Address;
  }
  interface UserOrdersPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    orders: Order[];
  }

  interface PageMainUserDashStates {
    navbarItems: typeof navItems;
    menuItems: typeof navItems;
    actionType:
      | "userCart"
      | "userAddresses"
      | "userOrders"
      | "userOrderId"
      | "userAddAddress"
      | "userEditAddress"
      | "userWishlist";
  }

  interface BookCartCardPropsType extends BookCardPropsType {
    num: number | string;
  }

  interface UserCartPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    books: BookCartCardPropsType[];
    addresses: Address[];
    priceSummary: {
      tax: string | number;
      shipping: string | number;
      total: string | number;
      subTotal: string | number;
    };
  }

  interface UserCartPageUpdateData {
    books: BookCartCardPropsType[];
    addresses: Address[];
    priceSummary: {
      tax: string | number;
      shipping: string | number;
      total: string | number;
      subTotal: string | number;
    };
    user: {
      cartNumber: string | number;
    };
  }

  interface Address {
    title: string;
    receiverName: string;
    state: string;
    city: string;
    street: string;
    tel: string | number;
    zipCode: string | number;
    country: string;
  }
}
export {};
