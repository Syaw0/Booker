const checkOtp = async (
  checkData: [
    isReset: boolean,
    isSignup: boolean,
    email: string,
    tfaCode: string
  ]
) => {
  const isReset = checkData[0];
  const isSignup = checkData[1];
  const email = checkData[2];
  const tfaCode = checkData[3];

  const query = `
    query CheckOtpCode($isReset:Boolean!,$isSignup:Boolean!,$email:String!,$tfaCode:String!){
      data:checkTfaCode(isReset:$isReset,isSignup:$isSignup,email:$email,tfaCode:$tfaCode){
        status,
        msg
      }
    }
  `;

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { isReset, isSignup, email, tfaCode },
    }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default checkOtp;
