import LoginForm from "src/components/loginform/loginform";
import style from "./authenticate.module.css";

const Authenticate = () => {
  return (
    <div className={style.holder}>
      <div className={style.left} />

      <div className={style.right}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Authenticate;
