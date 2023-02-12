import { ChangeEvent, useState } from "react";
import IconEmail from "src/assets/icons/iconEmail";
import useFetch from "src/hooks/useFetch";
import checkEmailForm from "src/utils/checkEmailForm";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import checkForgetPasswordForm, {
  loaderMsg,
} from "src/utils/checkForgetPasswordForm";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./forgetPasswordform.module.css";
import { useDispatch } from "react-redux";
import {
  setComponent,
  setCurrentEmail,
  setIsReset,
} from "src/store/authenticate/authenticateStore";

const ForgetPasswordForm = () => {
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({ email: "" });
  const [trigger, state, msg, setMsg] = useFetch(
    [checkForgetPasswordForm],
    [loaderMsg]
  );
  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const resp = await trigger(0);
    if (resp.status) {
      dispatch(setCurrentEmail(inputData.email));
      dispatch(setIsReset(true));
      dispatch(setComponent("tfa"));
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

  const loginInstead = () => {
    dispatch(setComponent("login"));
  };

  return (
    <div data-testid="forgetPasswordFormHolder" className={style.holder}>
      <div className={style.typographyHolder}>
        <Text variant="displayMedium" className={style.headText}>
          Forget Password
        </Text>
        <Text variant="titleMedium" className={style.subheadText}>
          Enter your account email address
        </Text>
      </div>
      <div className={style.inputsHolder}>
        <TextInput
          className={style.forgetPasswordFormEmailInput}
          name="email"
          id="email"
          label="Email Address"
          type="email"
          testId="forgetPasswordFormEmailInput"
          placeholder="Enter your email address..."
          value={inputData.email}
          onChange={inputChangeHandle}
          StartIcon={<IconEmail height="24" width="24" />}
        />
      </div>
      <div className={style.buttonHolder}>
        <Button
          testid="forgetPasswordFormNextButton"
          color="primary"
          onClick={next}
          className={style.NextButton}
        >
          Next
        </Button>
        <Text
          testid="forgetPasswordFormLoginButton"
          onClick={loginInstead}
          className={style.loginInsteadButton}
          variant="labelLarge"
        >
          Login instead
        </Text>
      </div>
      <Message type={state} msg={msg} />
    </div>
  );
};

export default ForgetPasswordForm;
