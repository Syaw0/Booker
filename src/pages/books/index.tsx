import Head from "next/head";
import { Provider } from "react-redux";
import Filter from "src/components/filter/filter";
import makeStore from "src/store/books/booksStore";

const BooksPage = () => {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>

      <div style={{ width: "100%", height: "100vh" }}>
        <Provider
          store={makeStore({
            filters: {
              categories: ["classic", "habits"],
              keyword: "",
              priceRange: { max: "", min: "" },
            },
          })}
        >
          <Filter />
        </Provider>
      </div>
    </>
  );
};

export default BooksPage;
