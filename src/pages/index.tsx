import Head from "next/head";
import BookCart from "src/components/bookCard/bookCard";
import BookIntroducer from "src/components/bookIntroducer/bookIntroducer";
import Footer from "src/components/footer/footer";
import Navbar from "src/components/navbar/navbar";
import { book1, book2, book3, book4 } from "src/shared/fakeBooks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        {/* <div style={{ display: "flex" }}>
        <BookCart {...book1} />
        <BookCart {...book2} />
        <BookCart {...book3} />
        <BookCart {...book4} />
      </div> */}
        <div style={{ width: "100%" }}>
          <BookIntroducer
            introducingName="Popular Books"
            hrefToAllBooks="/"
            books={[
              book1,
              book2,
              book3,
              book4,
              book1,
              book2,
              book3,
              book4,
              book1,
              book2,
              book3,
              book4,
            ]}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
