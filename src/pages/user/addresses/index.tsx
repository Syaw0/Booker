import checkSession from "db/utils/checkSession";
import getAddresses from "db/utils/getAddresses";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserAddresses from "src/components/pageComponents/userAddresses/userAddresses";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userAddresses/userAddresses";

const UserAddressesPage = (props: UserAddressesPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Addresses Page</title>
        <meta name="description" content="Booker user addresses page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserAddresses />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<UserAddressesPagePropsTypes>> => {
  const props: UserAddressesPagePropsTypes = {
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
    actionType: "userAddresses",
    menuItems: [],
    navbarItems: [],
    addresses: [],
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;
      const addresses = await getAddresses(user.data.userId);
      if (addresses.status) {
        props.addresses = addresses.data;
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

export default UserAddressesPage;
