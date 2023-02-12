import Head from "next/head";
import LoginForm from "src/components/loginform/loginform";

const AuthenticatePage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name="description" content="Booker Authentication page" />
      </Head>
      <div
        style={{
          background: "var(--background)",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
};

export default AuthenticatePage;
