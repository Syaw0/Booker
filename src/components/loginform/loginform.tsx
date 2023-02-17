import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import IconEmail from "src/assets/icons/iconEmail";
import IconLock from "src/assets/icons/iconLock";
import useFetch from "src/hooks/useFetch";
import {
  setComponent,
  setCurrentEmail,
  setIsReset,
} from "src/store/authenticate/authenticateStore";
import { useAuthStore } from "src/store/authenticate/authenticateStoreHooks";
import checkEmailForm from "src/utils/checkEmailForm";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import checkLoginForm, { loaderMsg } from "src/utils/checkLoginform";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./loginform.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isReset = useAuthStore((s) => s.isReset);
  const currentEmail = useAuthStore((s) => s.currentEmail);
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [trigger, state, msg, setMsg] = useFetch([checkLoginForm], [loaderMsg]);
  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const performCheckLoginform = async () => {
    if (!checkInputs()) {
      return;
    }
    const resp = await trigger(0, inputData.email, inputData.password);
    if (resp.status) {
      if (!isReset) {
        dispatch(setComponent("tfa"));
      } else if (currentEmail === inputData.email) {
        dispatch(setIsReset(false));
        router.reload();
      } else if (currentEmail !== inputData.email) {
        dispatch(setComponent("tfa"));
        dispatch(setIsReset(false));
      }
      dispatch(setCurrentEmail(inputData.email));
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      setMsg("error", "inputs must have value!");
      return false;
    }

    if (!checkEmailForm(inputData.email)) {
      setMsg("error", "use valid email address!");
      return false;
    }

    return true;
  };

  const forgetPassword = () => {
    dispatch(setComponent("forgetPassword"));
  };

  const signupInstead = () => {
    dispatch(setComponent("signup"));
  };

  return (
    <div data-testid="loginformHolder" className={style.holder}>
      <div className={style.typographyHolder}>
        <Text variant="displayMedium" className={style.headText}>
          Welcome Back
        </Text>
        <Text variant="titleMedium" className={style.subheadText}>
          Fill the form to login to your account
        </Text>
      </div>
      <div className={style.inputsHolder}>
        <TextInput
          className={style.loginformEmailInput}
          name="email"
          id="email"
          label="Email Address"
          type="email"
          testId="loginformEmailInput"
          placeholder="Enter your email address..."
          value={inputData.email}
          onChange={inputChangeHandle}
          StartIcon={<IconEmail height="24" width="24" />}
        />

        <span>
          <PasswordInput
            className={style.loginformPasswordInput}
            name="password"
            id="password"
            label="Password"
            testId="loginformPasswordInput"
            placeholder="Enter your account password..."
            value={inputData.password}
            onChange={inputChangeHandle}
            StartIcon={<IconLock height="24" width="24" />}
          />
          <Text
            testid="loginformForgetPasswordButton"
            className={style.forgetPasswordBtn}
            onClick={forgetPassword}
            variant="labelLarge"
          >
            Forget Password?
          </Text>
        </span>
      </div>
      <div className={style.buttonHolder}>
        <Button
          testid="loginformLoginButton"
          color="primary"
          onClick={performCheckLoginform}
          className={style.loginButton}
        >
          Login
        </Button>
        <Text
          testid="loginformSignupButton"
          onClick={signupInstead}
          className={style.forgetPasswordBtn}
          variant="labelLarge"
        >
          Signup instead
        </Text>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default LoginForm;
