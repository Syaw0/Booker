const checkForgetPasswordForm = async (
  checkForgetPasswordData: [email: string]
) => {
  const email = checkForgetPasswordData[0];

  const query = `
  query CheckForgetPasswordForm($email:String!){
    data:checkForgetPasswordData(email:$email){
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
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default checkForgetPasswordForm;
