import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./userSettingStore";

export const useUserSettingStore =
  useSelector as TypedUseSelectorHook<RootState>;
