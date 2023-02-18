import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type ComponentType =
  | "login"
  | "signup"
  | "tfa"
  | "forgetPassword"
  | "resetPassword";

type SignupData = {
  password: string;
  email: string;
};

interface AuthenticateStoreTypes {
  currentComponent: ComponentType;
  isReset: boolean;
  isSignup: boolean;
  currentEmail: string;
  signupData: SignupData;
}

const initialState: AuthenticateStoreTypes = {
  currentComponent: "tfa",
  currentEmail: "s@gmail.com",
  isReset: false,
  isSignup: false,
  signupData: {
    email: "",
    password: "",
  },
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: initialState,
  reducers: {
    setComponent(preState, action: PayloadAction<ComponentType>) {
      return {
        ...preState,
        currentComponent: action.payload,
      };
    },
    setCurrentEmail(preState, action: PayloadAction<string>) {
      return {
        ...preState,
        currentEmail: action.payload,
      };
    },
    setIsReset(preState, action: PayloadAction<boolean>) {
      return {
        ...preState,
        isReset: action.payload,
      };
    },

    setIsSignup(preState, action: PayloadAction<boolean>) {
      return {
        ...preState,
        isSignup: action.payload,
      };
    },
    setSignupData(preState, action: PayloadAction<SignupData>) {
      return {
        ...preState,
        signupData: action.payload,
      };
    },
  },
});

const makeStore = (preState: Partial<AuthenticateStoreTypes>) => {
  return configureStore({
    reducer: authenticateSlice.reducer,
    preloadedState: { ...initialState, ...preState },
  });
};

export const setIsReset = authenticateSlice.actions.setIsReset;
export const setIsSignup = authenticateSlice.actions.setIsSignup;
export const setComponent = authenticateSlice.actions.setComponent;
export const setSignupData = authenticateSlice.actions.setSignupData;
export const setCurrentEmail = authenticateSlice.actions.setCurrentEmail;

export default makeStore;
export type RootState = typeof initialState;
