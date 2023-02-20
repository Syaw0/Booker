import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userAddAddress";

export const useUserAddAddressStore =
  useSelector as TypedUseSelectorHook<RootState>;
