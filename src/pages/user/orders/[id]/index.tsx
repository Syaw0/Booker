import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserOrderId from "src/components/pageComponents/userOrderId/userOrderId";
import fakeUserOrderIdPageData from "src/shared/fakeUserOrderIdPageData";
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
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserOrderIdPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserOrderIdPageData,
    },
  };
};

export { getServerSideProps };

export default UserOrderIdPage;
