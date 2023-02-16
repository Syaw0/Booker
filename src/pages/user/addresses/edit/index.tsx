import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import UserEditAddress from "src/components/pageComponents/userEditAddress/userEditAddress";
import fakeUserEditAddressPageData from "src/shared/fakeUseEditAddressPageData";
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
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<UserEditAddressPagePropsTypes>
> => {
  return {
    props: {
      ...fakeUserEditAddressPageData,
    },
  };
};

export { getServerSideProps };

export default UserEditAddressPage;
