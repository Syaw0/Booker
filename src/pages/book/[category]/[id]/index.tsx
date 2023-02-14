import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import BookParticle from "src/components/pageComponents/book/book";
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
        <BookParticle />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({}): Promise<
  GetServerSidePropsResult<BookPagePropsTypes>
> => {
  return {
    props: {
      ...fakeBookPageData,
    },
  };
};

export { getServerSideProps };

export default BookPage;
