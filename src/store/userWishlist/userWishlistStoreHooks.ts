import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userWishlistStore";

export const useUserWishlistStore =
  useSelector as TypedUseSelectorHook<RootState>;
