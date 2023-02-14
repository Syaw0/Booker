import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import Books from "src/components/pageComponents/books/books";
import fakeBooksPageData from "src/shared/fakeBooksPageData";
import makeStore from "src/store/books/booksStore";

const BooksPage = (props: BooksPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>

      <div style={{ width: "100%", height: "100vh" }}>
        <Provider store={makeStore(props)}>
          <Books />
        </Provider>
      </div>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<BooksPagePropsTypes>
> => {
  return {
    props: {
      ...fakeBooksPageData,
    },
  };
};

export { getServerSideProps };

export default BooksPage;
