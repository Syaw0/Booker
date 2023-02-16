import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
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
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserWishlistPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserWishlistPageData,
    },
  };
};

export { getServerSideProps };

export default UserWishlistPage;
