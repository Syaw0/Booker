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
  interface PageMainStates {
    isLogin: boolean;
    user: {
      email: string;
      cartNumber: string | number;
      userId: string;
      profileUrl: string;
    };
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

  interface PageMainUserDashStates {
    navbarItems: typeof navItems;
    menuItems: typeof navItems;
  }
  interface UserCartPagePropsTypes
    extends PageMainStates,
      PageMainUserDashStates {
    books: (BookCardPropsType & { num: number })[];
    addresses: Address[];
    priceSummary: {
      tax: string | number;
      shipping: string | number;
      total: string | number;
      subTotal: string | number;
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
