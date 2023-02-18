import { ChangeEvent, useState } from "react";
import useFetch from "src/hooks/useFetch";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import Button from "../button/button";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./resetPasswordform.module.css";
import resetPassword, { loaderMsg } from "src/utils/resetPassword";
import PasswordInput from "../input/password/passwordInput";
import IconLock from "src/assets/icons/iconLock";
import checkPasswordEquality from "src/utils/checkPasswordEquality";
import checkPasswordValidity from "src/utils/checkPasswordValidity";
import { useDispatch } from "react-redux";
import {
  setComponent,
  setIsReset,
} from "src/store/authenticate/authenticateStore";
import { useAuthStore } from "src/store/authenticate/authenticateStoreHooks";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const email = useAuthStore((s) => s.currentEmail);
  const [trigger, state, msg, setMsg] = useFetch([resetPassword], [loaderMsg]);
  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const resp = await trigger(
      0,
      email,
      inputData.oldPassword,
      inputData.newPassword
    );
    if (resp.status) {
      dispatch(setComponent("login"));
    }
  };

  const checkInputs = () => {
    if (!checkInputsEmptiness(inputData)) {
      setMsg("error", "inputs must have value!");
      return false;
    }

    if (!checkPasswordValidity(inputData.newPassword)) {
      setMsg("error", "password must has 5 or more character!");
      return false;
    }

    if (checkPasswordEquality(inputData.newPassword, inputData.oldPassword)) {
      setMsg("error", "the old and new password is same!");
      return false;
    }

    if (
      !checkPasswordEquality(inputData.newPassword, inputData.retypePassword)
    ) {
      setMsg("error", "the new password and retype is not same!");
      return false;
    }

    return true;
  };

  const loginInstead = () => {
    dispatch(setIsReset(false));
    dispatch(setComponent("login"));
  };

  return (
    <div data-testid="resetPasswordFormHolder" className={style.holder}>
      <div className={style.typographyHolder}>
        <Text variant="displayMedium" className={style.headText}>
          Reset Password
        </Text>
        <Text variant="titleMedium" className={style.subheadText}>
          Fill form to reset your password
        </Text>
      </div>
      <div className={style.inputsHolder}>
        <PasswordInput
          className={style.signupformPasswordInput}
          name="oldPassword"
          id="oldPassword"
          label="Old Password"
          testId="resetPasswordFormOldPasswordInput"
          placeholder="Enter your old password..."
          value={inputData.oldPassword}
          onChange={inputChangeHandle}
          StartIcon={<IconLock height="24" width="24" />}
        />
        <PasswordInput
          className={style.signupformPasswordInput}
          name="newPassword"
          id="newPassword"
          label="New Password"
          testId="resetPasswordFormNewPasswordInput"
          placeholder="Enter your New password..."
          value={inputData.newPassword}
          onChange={inputChangeHandle}
          StartIcon={<IconLock height="24" width="24" />}
        />
        <PasswordInput
          className={style.signupformPasswordInput}
          name="retypePassword"
          id="retypePassword"
          label="Retype New Password"
          testId="resetPasswordFormRetypePasswordInput"
          placeholder="Retype your new Password"
          value={inputData.retypePassword}
          onChange={inputChangeHandle}
          StartIcon={<IconLock height="24" width="24" />}
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
