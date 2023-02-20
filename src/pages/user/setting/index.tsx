import checkSession from "db/utils/checkSession";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserSetting from "src/components/pageComponents/userSetting/userSetting";
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
const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<UserSettingPagePropsTypes>> => {
  const props: UserSettingPagePropsTypes = {
    actionType: "userSetting",
    isLogin: false,
    menuItems: [],
    navbarItems: [],
    user: {
      cartNumber: "",
      email: "",
      profileUrl: "",
      userId: "",
      wishlist: [],
      addresses: [],
      cart: [],
      orders: [],
    },
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;
    } else {
      return { redirect: { destination: "/500", permanent: false } };
    }
  }
  return {
    props: {
      ...props,
    },
  };
};

export { getServerSideProps };

export default UserSettingPage;
