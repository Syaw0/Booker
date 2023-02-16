import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserSetting from "src/components/pageComponents/userSetting/userSetting";
import fakeUserSettingPageData from "src/shared/fakeUserSettingPageData";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userSetting/userSettingStore";

const UserSettingPage = (props: UserSettingPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Setting Page</title>
        <meta name="description" content="Booker user setting page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserSetting />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserSettingPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserSettingPageData,
    },
  };
};

export { getServerSideProps };

export default UserSettingPage;
