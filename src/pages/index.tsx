import Head from "next/head";
import Navbar from "src/components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Booker Home Page</title>
        <meta name="description" content="Booker Home Page" />
      </Head>
      <Navbar />
    </>
  );
}
