import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import Home from "src/components/pageComponents/home/home";
import fakeHomePageData from "src/shared/fakeHomePageData";
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

const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<HomePagePropsTypes>
> => {
  return {
    props: {
      ...fakeHomePageData,
    },
  };
};

export { getServerSideProps };
export default HomePage;
