import Head from "next/head";
import Authenticate from "src/components/pageComponents/auth/authenticate";

const AuthenticatePage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Booker Authentication page" />
      </Head>
      <Authenticate />
    </>
  );
};

export default AuthenticatePage;
