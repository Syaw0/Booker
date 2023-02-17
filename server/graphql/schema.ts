import { buildSchema } from "graphql";
const schema = buildSchema(`
type Query{
  checkLoginInformation(email:String!="",password:String!=""):Response
}


type Response {
  status:Boolean!
  msg:String!
}




`);

export default schema;
