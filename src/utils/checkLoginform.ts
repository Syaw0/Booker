import { SHA256 } from "crypto-js";

const checkLoginForm = async (loginData: [email: string, password: string]) => {
  const email = loginData[0];
  const password = SHA256(loginData[1]).toString();

  const query = `
  query CheckLoginInformation($email:String! , $password:String!){
      result:checkLoginInformation(email:$email,password:$password){
        status,
        msg
      }
  }`;

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { email, password } }),
  });

  const json = await resp.json();
  console.log(json);
  const data = json.data.result;
  console.log(data);
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default checkLoginForm;
