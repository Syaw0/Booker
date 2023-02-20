import { SHA256 } from "crypto-js";

const resetPassword = async (
  resetPassData: [email: string, oldPassword: string, newPassword: string]
) => {
  const email = resetPassData[0];
  const oldPassword = SHA256(resetPassData[1]).toString();
  const newPassword = SHA256(resetPassData[2]).toString();

  const query = `
  query ResetPassword($email:String!,$oldPassword:String!,$newPassword:String!){
    data:resetPassword(email:$email,oldPassword:$oldPassword,newPassword:$newPassword){
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
    body: JSON.stringify({
      query,
      variables: { email, oldPassword, newPassword },
    }),
  });

  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default resetPassword;
