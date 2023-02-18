import checkSession from "db/utils/checkSession";
import getFilteredBooks from "db/utils/getFilteredBooks";
import getUserById from "db/utils/getUserById";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { Provider } from "react-redux";
import Books from "src/components/pageComponents/books/books";
import makeStore from "src/store/books/booksStore";

const BooksPage = (props: BooksPagePropsTypes) => {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>

      <Provider store={makeStore(props)}>
        <Books />
      </Provider>
    </>
  );
};
const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}): Promise<GetServerSidePropsResult<BooksPagePropsTypes>> => {
  const props: BooksPagePropsTypes = {
    books: [],
    filters: {
      categories: [],
      keyword: "",
      priceRange: { max: "", min: "" },
    },
    isFilterOpen: false,
    isLogin: false,
    user: {
      cartNumber: "",
      email: "",
      profileUrl: "",
      userId: "",
      wishlist: [],
    },
  };

  const checkSessionResult = await checkSession(req.cookies);
  if (checkSessionResult.status && checkSessionResult.data != null) {
    const user = await getUserById(checkSessionResult.data);
    if (user.status && user.data != null) {
      props.user = user.data;
      props.user.cartNumber = JSON.parse(user.data.cart).length;
      props.isLogin = true;
    } else {
      return { redirect: { destination: "/500", permanent: false } };
    }
  }
  if (query != null && query.q != null) {
    props.filters.keyword = query.q as string;
    const searchQuery = `name LIKE "%${query.q}%" or author LIKE "%${query.q}%" or category LIKE "%${query.q}%" `;
    const result = await getFilteredBooks(searchQuery, 0, 1000);
    if (result.status) {
      props.books = result.data;
    }
  }

  return {
    props: {
      ...props,
    },
  };
};

export { getServerSideProps };

export default BooksPage;
