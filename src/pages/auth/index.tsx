import Head from "next/head";
import { Provider } from "react-redux";
import Authenticate from "src/components/pageComponents/auth/authenticate";
import makeStore from "src/store/authenticate/authenticateStore";

const AuthenticatePage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Booker Authentication page" />
      </Head>
      <Provider store={makeStore({})}>
        <Authenticate />
      </Provider>
    </>
  );
};

export default AuthenticatePage;
