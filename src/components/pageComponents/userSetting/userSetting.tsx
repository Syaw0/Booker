import IconCard from "src/assets/icons/iconCard";
import IconEmail from "src/assets/icons/iconEmail";
import IconLock from "src/assets/icons/iconLock";
import Footer from "src/components/footer/footer";
import MultiSectionHorizontal from "src/components/multiSectionHorizontal/multiSectionHorizontal";
import Navbar from "src/components/navbar/navbar";
import Text from "src/components/typography/typography";
import UserDashBase from "src/components/userDashBase/userDashBase";
import style from "./userSetting.module.css";
const UserSetting = () => {
  return (
    <div data-testid="userSettingPage" className={style.holder}>
      <Navbar />
      <UserDashBase className={style.SettingHolder}>
        <MultiSectionHorizontal
          className={style.multiSectionHolder}
          layoutData={[
            {
              sectionName: "Information",
              component: (
                <div>
                  <Text variant="headlineSmall">UNDER DEVELOPING</Text>
                </div>
              ),
              Icon: IconEmail,
            },
            {
              sectionName: "Email And Password",
              component: (
                <div>
                  <Text variant="headlineSmall">UNDER DEVELOPING</Text>
                </div>
              ),
              Icon: IconLock,
            },
            {
              sectionName: "Cards",
              component: (
                <div>
                  <Text variant="headlineSmall">UNDER DEVELOPING</Text>
                </div>
              ),
              Icon: IconCard,
            },
          ]}
        />
        <div data-testid="oneSectionHolder" className={style.oneSectionHolder}>
          <Text variant="headlineSmall">UNDER DEVELOPING</Text>
        </div>
      </UserDashBase>
      <Footer />
    </div>
  );
};

export default UserSetting;
