import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userOrderId";

export const useUserOrderIdStore =
  useSelector as TypedUseSelectorHook<RootState>;
