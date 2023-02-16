import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserAddAddress from "src/components/pageComponents/userAddAddress/userAddAddress";
import fakeUserAddAddressPageData from "src/shared/fakeUserAddAddressPageData";
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
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserAddAddressPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserAddAddressPageData,
    },
  };
};

export { getServerSideProps };

export default UserAddAddressPage;
