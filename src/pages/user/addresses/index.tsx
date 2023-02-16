import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserAddresses from "src/components/pageComponents/userAddresses/userAddresses";
import fakeUserAddressesPageData from "src/shared/fakeUserAddressesPageData";
import navItems from "src/shared/userDashNavItems";
import makeStore from "src/store/userAddresses/userAddresses";

const UserAddressesPage = (props: UserAddressesPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>User Addresses Page</title>
        <meta name="description" content="Booker user addresses page" />
      </Head>
      <Provider store={makeStore({ ...props, navbarItems: navItems })}>
        <UserAddresses />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserAddressesPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserAddressesPageData,
    },
  };
};

export { getServerSideProps };

export default UserAddressesPage;
