import checkSession from "db/utils/checkSession";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserAddAddress from "src/components/pageComponents/userAddAddress/userAddAddress";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userAddAddress/userAddAddress";

const UserAddAddressPage = (props: UserAddAddressPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Add Address Page</title>
        <meta name="description" content="Booker user add address page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserAddAddress />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<UserAddAddressPagePropsTypes>> => {
  const props: UserAddAddressPagePropsTypes = {
    actionType: "userAddAddress",
    address: {
      city: "",
      country: "",
      receiverName: "",
      state: "",
      street: "",
      tel: "",
      title: "",
      zipCode: "",
    },
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

export default UserAddAddressPage;
