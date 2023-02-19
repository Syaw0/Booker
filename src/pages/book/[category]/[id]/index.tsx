import checkSession from "db/utils/checkSession";
import getBookById from "db/utils/getBookById";
import getSimilarBooks from "db/utils/getSimilarBooks";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import BookParticle from "src/components/pageComponents/book/book";
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
const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}): Promise<GetServerSidePropsResult<BookPagePropsTypes>> => {
  const props: BookPagePropsTypes = {
    book: {
      author: "",
      bookId: "",
      category: "Bears",
      description: "",
      image: "",
      name: "",
      price: "",
    },
    booksIntroducers: {
      similar: {
        books: [],
        hrefToAllBooks: "",
        introducingName: "Similar Books",
      },
    },
    isLogin: false,
    user: {
      cartNumber: "",
      email: "",
      profileUrl: "",
      userId: "",
      wishlist: [],
      addresses: [],
      cart: [],
      orders: [],
    },
  };
  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.user.cartNumber = user.data.cart.length;
      props.isLogin = true;
    } else {
      return { redirect: { destination: "/500", permanent: false } };
    }
  }

  if (params && params.id != null) {
    const book = await getBookById(params.id as string);
    if (book.status) {
      props.book = book.data;

      const similarBooks = await getSimilarBooks(
        book.data.bookId,
        book.data.category
      );
      if (similarBooks.status) {
        props.booksIntroducers.similar.books = similarBooks.data;
      }
    } else {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      ...props,
    },
  };
};

export { getServerSideProps };

export default BookPage;
