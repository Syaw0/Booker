import { SHA256 } from "crypto-js";

const signup = async (signupData: [email: string, password: string]) => {
  const email = signupData[0];
  const password = SHA256(signupData[1]).toString();

  const query = `
    query SignUp($email:String!,$password:String!){
      data:signup(email:$email,password:$password){
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
    body: JSON.stringify({ query, variables: { email, password } }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default signup;
