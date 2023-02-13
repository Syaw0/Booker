import Head from "next/head";
import BookCart from "src/components/bookCard/bookCard";
import Navbar from "src/components/navbar/navbar";
import { book1, book2, book3, book4 } from "src/shared/fakeBooks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>
      <Navbar />
      <div style={{ display: "flex" }}>
        <BookCart {...book1} />
        <BookCart {...book2} />
        <BookCart {...book3} />
        <BookCart {...book4} />
      </div>
    </>
  );
}
