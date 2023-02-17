import { buildSchema } from "graphql";
const schema = buildSchema(`
type Query{
  checkLoginInformation(email:String!="",password:String!=""):Response
  checkTfaCode(email:String!,tfaCode:StrOrNum!):Response
}


type Response {
  status:Boolean!
  msg:String!
}

union StrOrNum = String | Int



`);

export default schema;
