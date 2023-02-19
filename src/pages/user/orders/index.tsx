import checkSession from "db/utils/checkSession";
import getUserById from "db/utils/getUserById";
import getUserOrders from "db/utils/getUserOrders";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserOrders from "src/components/pageComponents/userOrders/userOrders";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userOrders/userOrders";

const UserOrdersPage = (props: UserOrdersPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Orders Page</title>
        <meta name="description" content="Booker user orders page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserOrders />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<UserOrdersPagePropsTypes>> => {
  const props: UserOrdersPagePropsTypes = {
    isLogin: false,
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
    actionType: "userOrders",
    menuItems: [],
    navbarItems: [],
    orders: [],
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;
      const orders = await getUserOrders(user.data.userId);
      if (orders.status) {
        props.orders = orders.data;
      }
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

export default UserOrdersPage;
