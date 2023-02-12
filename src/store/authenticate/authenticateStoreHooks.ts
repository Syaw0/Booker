import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./authenticateStore";

export const useAuthStore = useSelector as TypedUseSelectorHook<RootState>;
