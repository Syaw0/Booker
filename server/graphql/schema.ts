import { buildSchema } from "graphql";
const schema = buildSchema(`
type Query{
  checkLoginInformation(email:String!="",password:String!=""):Response
  checkTfaCode(isReset:Boolean!,isSignup:Boolean!,email:String!,tfaCode:String!):Response
  getFreshTfaCode(email:String!):Response
  signup(email:String!,password:String!):Response
  checkForgetPasswordData(email:String!):Response
  resetPassword(email:String!,oldPassword:String!,newPassword:String!):Response
}


type Response {
  status:Boolean!
  msg:String!
}





`);

export default schema;
