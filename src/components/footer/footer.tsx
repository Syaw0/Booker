import Text from "../typography/typography";
import style from "./footer.module.css";
const Footer = () => {
  return (
    <div data-testid="footerHolder" className={style.holder}>
      <Text testid="footerText" className={style.text} variant="titleMedium">
        © 2023 Booker , All Rights reserved
      </Text>
    </div>
  );
};

export default Footer;
