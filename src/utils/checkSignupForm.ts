const checkSignupForm = async (checkData: [email: string]) => {
  const email = checkData[0];

  const query = `
    query CheckSignupData($email:String!){
      data:checkSignupData(email:$email){
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
export default checkSignupForm;
