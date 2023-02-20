import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userOrders";

export const useUserOrdersStore =
  useSelector as TypedUseSelectorHook<RootState>;
