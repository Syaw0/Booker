import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userEditAddressStore";

export const useUserEditAddressStore =
  useSelector as TypedUseSelectorHook<RootState>;
