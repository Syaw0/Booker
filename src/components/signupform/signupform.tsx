import { ChangeEvent, useState } from "react";
import IconEmail from "src/assets/icons/iconEmail";
import IconLock from "src/assets/icons/iconLock";
import useFetch from "src/hooks/useFetch";
import checkEmailForm from "src/utils/checkEmailForm";
import checkInputsEmptiness from "src/utils/checkInputEmptiness";
import checkPasswordValidity from "src/utils/checkPasswordValidity";
import checkSignupForm, { loaderMsg } from "src/utils/checkSignupForm";
import Button from "../button/button";
import PasswordInput from "../input/password/passwordInput";
import TextInput from "../input/text/textInput";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./signupform.module.css";

const SignupForm = () => {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const [trigger, state, msg, setMsg] = useFetch(
    [checkSignupForm],
    [loaderMsg]
  );
  const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setInputData((s) => ({ ...s, [name]: value }));
  };

  const performCheckSignupform = async () => {
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
    if (!checkPasswordValidity(inputData.password)) {
      setMsg("error", "password must has 5 or more character!");
      return false;
    }

    return true;
  };

  const loginInstead = () => {};

  return (
    <div data-testid="signupformHolder" className={style.holder}>
      <div className={style.typographyHolder}>
        <Text variant="displayLarge" className={style.headText}>
          Welcome
        </Text>
        <Text variant="headlineSmall" className={style.subheadText}>
          Fill the form to join our store membership
        </Text>
      </div>
      <div className={style.inputsHolder}>
        <TextInput
          className={style.signupformEmailInput}
          name="email"
          id="email"
          label="Email Address"
          type="email"
          testId="signupformEmailInput"
          placeholder="Enter your email address..."
          value={inputData.email}
          onChange={inputChangeHandle}
          StartIcon={<IconEmail height="24" width="24" />}
        />

        <PasswordInput
          className={style.signupformPasswordInput}
          name="password"
          id="password"
          label="Password"
          testId="signupformPasswordInput"
          placeholder="Enter your account password..."
          value={inputData.password}
          onChange={inputChangeHandle}
          StartIcon={<IconLock height="24" width="24" />}
        />
      </div>
      <div className={style.buttonHolder}>
        <Button
          testid="signupformSignupButton"
          color="primary"
          onClick={performCheckSignupform}
          className={style.registerButton}
        >
          Signup
        </Button>
        <Text
          testid="signupformLoginButton"
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

export default SignupForm;
