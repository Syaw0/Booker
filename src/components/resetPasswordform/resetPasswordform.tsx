import { ChangeEvent, useState } from "react";
import IconEmail from "src/assets/icons/iconEmail";
import IconLock from "src/assets/icons/iconLock";
import useFetch from "src/hooks/useFetch";
import checkEmailForm from "src/utils/checkEmailForm";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import checkResetPasswordForm, {
  loaderMsg,
} from "src/utils/checkResetPasswordForm";
import Button from "../button/button";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./resetPasswordform.module.css";

const ResetPasswordForm = () => {
  const [inputData, setInputData] = useState({ email: "" });
  const [trigger, state, msg, setMsg] = useFetch(
    [checkResetPasswordForm],
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

  const loginInstead = () => {};

  return (
    <div data-testid="resetPasswordFormHolder" className={style.holder}>
      <div className={style.typographyHolder}>
        <Text variant="displayLarge" className={style.headText}>
          Reset Password
        </Text>
        <Text variant="headlineSmall" className={style.subheadText}>
          Enter your account email address
        </Text>
      </div>
      <div className={style.inputsHolder}>
        <TextInput
          className={style.resetPasswordFormEmailInput}
          name="email"
          id="email"
          label="Email Address"
          type="email"
          testId="resetPasswordFormEmailInput"
          placeholder="Enter your email address..."
          value={inputData.email}
          onChange={inputChangeHandle}
          StartIcon={<IconEmail height="24" width="24" />}
        />
      </div>
      <div className={style.buttonHolder}>
        <Button
          testid="resetPasswordFormNextButton"
          color="primary"
          onClick={next}
          className={style.NextButton}
        >
          Next
        </Button>
        <Text
          testid="resetPasswordFormLoginButton"
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

export default ResetPasswordForm;
