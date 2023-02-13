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
}
export {};
