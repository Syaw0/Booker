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
    category: string;
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

  type categories = "politic" | "history" | "habits" | "psychology";

  interface BooksPagePropsTypes extends PageMainStates {
    books: BookCardPropsType[];
    filters: {
      keyword: string;
      priceRange: {
        min: string | number;
        max: string | number;
      };
      categories: categories[];
    };
  }
}
export {};
