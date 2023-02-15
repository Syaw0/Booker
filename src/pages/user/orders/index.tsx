import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserOrders from "src/components/pageComponents/userOrders/userOrders";
import fakeUserOrdersPageData from "src/shared/fakeUserOrdersPageData";
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
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserOrdersPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserOrdersPageData,
    },
  };
};

export { getServerSideProps };

export default UserOrdersPage;
