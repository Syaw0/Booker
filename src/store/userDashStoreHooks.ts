import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useUserDashStore: TypedUseSelectorHook<PageMainUserDashStates> =
  useSelector;
