import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userCart";

export const useUserCartStore = useSelector as TypedUseSelectorHook<RootState>;
