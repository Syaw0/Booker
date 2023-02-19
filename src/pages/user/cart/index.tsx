import checkSession from "db/utils/checkSession";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import calculatePrices from "server/graphql/utils/calculatePrices";
import getCartData from "server/graphql/utils/getCartData";
import UserCart from "src/components/pageComponents/userCart/userCart";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userCart/userCart";

const UserCartPage = (props: UserCartPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Cart Page</title>
        <meta name="description" content="Booker user cart page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserCart />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<UserCartPagePropsTypes>> => {
  const props: UserCartPagePropsTypes = {
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
    actionType: "userCart",
    menuItems: [],
    navbarItems: [],
    addresses: [],
    books: [],
    priceSummary: {
      shipping: "",
      subTotal: "",
      tax: "",
      total: "",
    },
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;
      console.log(user.data.cart);
      if (user.data.cart.length != 0) {
        const cart = await getCartData(user.data.cart);
        if (cart.status) {
          props.books = cart.data as BookCartCardPropsType[];
          let summary = calculatePrices(cart.data);
          props.priceSummary = summary;
        }
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

export default UserCartPage;
