import checkSession from "db/utils/checkSession";
import getOrder from "db/utils/getOrder";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserOrderId from "src/components/pageComponents/userOrderId/userOrderId";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userOrderId/userOrderId";

const UserOrderIdPage = (props: UserOrderIdPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Order Page</title>
        <meta name="description" content="Booker user order page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserOrderId />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}): Promise<GetServerSidePropsResult<UserOrderIdPagePropsTypes>> => {
  const props: UserOrderIdPagePropsTypes = {
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
    order: {
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
      books: [],
      date: "",
      orderId: "",
      priceSummary: { shipping: "", subTotal: "", tax: "", total: "" },
      state: "delivered",
    },
  };
  if (params == null || params.id == null) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;
      const orderId = params.id as string;
      const order = await getOrder(orderId as string);
      if (order.status) {
        props.order = order.data;
      } else {
        return {
          redirect: {
            destination: "/404",
            permanent: false,
          },
        };
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

export default UserOrderIdPage;
