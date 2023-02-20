const getFreshOtp = async (getFreshOtpData: [email: string]) => {
  const email = getFreshOtpData[0];

  const query = `
  query GetFreshTfaCode($email:String!){
    data:getFreshTfaCode(email:$email){
      status
      msg
    }
  }
  `;

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { email } }),
  });

  const json = await resp.json();
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default getFreshOtp;
