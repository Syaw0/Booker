import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import Book from "src/components/book/book";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import Books from "src/components/pageComponents/books/books";
import fakeBookPageData from "src/shared/fakeBookPageData";
import makeStore from "src/store/book/bookStore";

const BookPage = (props: BookPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>{props.book.name}</title>
        <meta name="description" content={`Booker ${props.book.bookId} page`} />
      </Head>

      <Provider store={makeStore(props)}>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Navbar />
          <Book />
          <Footer />
        </div>
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  params,
}): Promise<GetServerSidePropsResult<BookPagePropsTypes>> => {
  return {
    props: {
      ...fakeBookPageData,
    },
  };
};

export { getServerSideProps };

export default BookPage;
