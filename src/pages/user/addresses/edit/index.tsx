import checkSession from "db/utils/checkSession";
import getAddressById from "db/utils/getAddressById";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserEditAddress from "src/components/pageComponents/userEditAddress/userEditAddress";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userEditAddress/userEditAddressStore";

const UserEditAddressPage = (props: UserEditAddressPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Edit Address Page</title>
        <meta name="description" content="Booker user edit address page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserEditAddress />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}): Promise<GetServerSidePropsResult<UserEditAddressPagePropsTypes>> => {
  let addressId;
  if (query && query.addressId != null) {
    addressId = query.addressId;
  }

  if (addressId == null) {
    return { redirect: { destination: "/404", permanent: false } };
  }
  const props: UserEditAddressPagePropsTypes = {
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
    address: {
      addressId: "",
      city: "",
      country: "",
      receiverName: "",
      state: "",
      street: "",
      tel: "",
      title: "",
      zipCode: "",
    },
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;
      const address = await getAddressById(addressId as string);
      if (address.status) {
        props.address = address.data;
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

export default UserEditAddressPage;
