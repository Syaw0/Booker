import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userAddresses";

export const useUserAddressesStore =
  useSelector as TypedUseSelectorHook<RootState>;
