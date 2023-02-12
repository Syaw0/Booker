import Head from "next/head";
import LoginForm from "src/components/loginform/loginform";
import ResetPasswordForm from "src/components/resetPasswordform/resetPasswordform";
import SignupForm from "src/components/signupform/signupform";

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
        {/* <LoginForm /> */}
        {/* <SignupForm /> */}
        <ResetPasswordForm />
      </div>
    </>
  );
};

export default AuthenticatePage;
