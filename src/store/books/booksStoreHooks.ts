import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./booksStore";

export const useBooksStore = useSelector as TypedUseSelectorHook<RootState>;
