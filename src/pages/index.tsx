import checkSession from "db/utils/checkSession";
import getIntroducers from "db/utils/getIntroducers";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import Home from "src/components/pageComponents/home/home";
import makeStore from "src/store/home/homeStore";

const HomePage = (props: HomePagePropsTypes) => {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>
      <Provider store={makeStore(props)}>
        <Home />
      </Provider>
    </>
  );
};

const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<GetServerSidePropsResult<HomePagePropsTypes>> => {
  const checkSessionResult = await checkSession(req.cookies);
  const props: HomePagePropsTypes = {
    booksIntroducers: { mainIntroducers: [] },
    isLogin: false,
    user: {
      cartNumber: "1",
      email: "",
      profileUrl: "",
      userId: "",
      wishlist: [],
    },
  };
  if (checkSessionResult.status && checkSessionResult.data != null) {
    console.log(checkSessionResult);
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.user.cartNumber = JSON.parse(user.data.cart).length;
      props.isLogin = true;
    } else {
      return { redirect: { destination: "/500", permanent: false } };
    }
  }

  const introducers = await getIntroducers();
  if (introducers.status && introducers.data != null) {
    props.booksIntroducers.mainIntroducers = introducers.data;
  }

  return {
    props: {
      ...props,
    },
  };
};

export { getServerSideProps };
export default HomePage;
