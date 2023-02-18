import ForgetPasswordForm from "src/components/forgetPasswordform/forgetPasswordform";
import LoginForm from "src/components/loginform/loginform";
import ResetPasswordForm from "src/components/resetPasswordform/resetPasswordform";
import SignupForm from "src/components/signupform/signupform";
import TfaForm from "src/components/tfaForm/tfaForm";
import { useAuthStore } from "src/store/authenticate/authenticateStoreHooks";
import style from "./authenticate.module.css";

const Authenticate = () => {
  const whichComponent = useAuthStore((s) => s.currentComponent);
  return (
    <div data-testid="authenticateHolder" className={style.holder}>
      <div data-testid="authenticateLeft" className={style.left} />

      <div data-testid="authenticateRight" className={style.right}>
        {whichComponent === "login" && <LoginForm />}
        {whichComponent === "signup" && <SignupForm />}
        {whichComponent === "resetPassword" && <ResetPasswordForm />}
        {whichComponent === "forgetPassword" && <ForgetPasswordForm />}
        {whichComponent === "tfa" && <TfaForm timerInit={4} />}
      </div>
    </div>
  );
};

export default Authenticate;
