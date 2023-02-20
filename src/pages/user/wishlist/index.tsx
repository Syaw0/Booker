import checkSession from "db/utils/checkSession";
import getFilteredBooks from "db/utils/getFilteredBooks";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import makeQueryForWishList from "server/graphql/utils/makeQueryForWishlist";
import UserWishlist from "src/components/pageComponents/userWishlist/userWishlist";
import fakeUserWishlistPageData from "src/shared/fakeUserWishlistPageData";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userWishlist/userWishlistStore";

const UserWishlistPage = (props: UserWishlistPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Wishlist Page</title>
        <meta name="description" content="Booker user wishlist page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserWishlist />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<UserWishlistPagePropsTypes>> => {
  const props: UserWishlistPagePropsTypes = {
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
    actionType: "userWishlist",
    menuItems: [],
    navbarItems: [],
    wishlist: [],
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.isLogin = true;

      let query = makeQueryForWishList(user.data.wishlist);
      if (query != "") {
        const books = await getFilteredBooks(query, 0, 1000);
        if (books.status) {
          props.wishlist = books.data;
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

export default UserWishlistPage;
