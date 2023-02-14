import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserCart from "src/components/pageComponents/userCart/userCart";
import fakeUserCartPageData from "src/shared/fakeUserCartPageData";
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
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserCartPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserCartPageData,
    },
  };
};

export { getServerSideProps };

export default UserCartPage;
