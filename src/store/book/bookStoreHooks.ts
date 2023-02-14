import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./bookStore";

export const useBookStore = useSelector as TypedUseSelectorHook<RootState>;
