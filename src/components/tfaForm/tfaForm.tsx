import { useState } from "react";
import useFetch from "src/hooks/useFetch";
import Button from "../button/button";
import Message from "../message/message";
import Text from "../typography/typography";
import style from "./tfaForm.module.css";
import OtpInput from "../input/otp/otp";
import checkOtp, { loaderMsg } from "src/utils/checkOtp";
import Timer from "../timer/timer";
import getFreshOtp, {
  loaderMsg as getFreshOtpLoaderMsg,
} from "src/utils/getFreshOtp";
import { useDispatch } from "react-redux";
import {
  setComponent,
  setIsReset,
} from "src/store/authenticate/authenticateStore";
import { useAuthStore } from "src/store/authenticate/authenticateStoreHooks";
import { useRouter } from "next/router";
import signup, { loaderMsg as signupLoaderMsg } from "src/utils/signup";

interface TfaFormPropsType {
  timerInit?: number;
}

const TfaForm = ({ timerInit = 60 }: TfaFormPropsType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isReset = useAuthStore((s) => s.isReset);
  const isSignup = useAuthStore((s) => s.isSignup);
  const email = useAuthStore((s) => s.currentEmail);
  const signupData = useAuthStore((s) => s.signupData);
  const [inputData, setInputData] = useState("");
  const [timer, setTimer] = useState(timerInit);
  const [trigger, state, msg, setMsg] = useFetch(
    [checkOtp, getFreshOtp, signup],
    [loaderMsg, getFreshOtpLoaderMsg, signupLoaderMsg]
  );

  const next = async () => {
    if (!checkInputs()) {
      return;
    }
    const resp = await trigger(0, isReset, isSignup, email, inputData);
    if (resp.status) {
      if (isReset) {
        return dispatch(setComponent("resetPassword"));
      }
      if (isSignup) {
        const result = await trigger(2, signupData.email, signupData.password);
        if (!result.status) {
          return;
        }
      }
      router.replace("/");
    }
  };

  const checkInputs = () => {
    if (inputData.length != 6) {
      setMsg("error", "otp input must have a value!");
      return false;
    }
    return true;
  };

  const getFreshCode = async () => {
    if (timer <= 0) {
      const result = await trigger(1, email);
      if (result.status) {
        setTimer(120);
      }
    }
  };

  const loginInstead = () => {
    if (isReset) {
      dispatch(setIsReset(false));
    }
    dispatch(setComponent("login"));
  };

  return (
    <div data-testid="tfaFormHolder" className={style.holder}>
      <div className={style.typographyHolder}>
        <Text variant="displayMedium" className={style.headText}>
          Assurance
        </Text>

        <Text variant="titleMedium" className={style.subheadText}>
          we just send email to your email address , enter the code that we send
          ! you have just 3 times to try , after that the code is outdated.{" "}
          <Text
            testid="tfaForm_getFreshCode"
            as="span"
            onClick={getFreshCode}
            className={style.getFreshCode}
          >
            get fresh code
          </Text>
          <Timer setTime={setTimer} time={timer} />
        </Text>
      </div>
      <div className={style.inputsHolder}>
        <OtpInput len={6} setValue={setInputData} value={inputData} />
      </div>
      <div className={style.buttonHolder}>
        <Button
          testid="tfaFormNextButton"
          color="primary"
          onClick={next}
          className={style.NextButton}
        >
          Next
        </Button>
        <Text
          testid="tfaFormLoginButton"
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

export default TfaForm;
