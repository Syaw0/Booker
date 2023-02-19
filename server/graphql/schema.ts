import { buildSchema } from "graphql";
const schema = buildSchema(`
type Query{
  checkLoginInformation(email:String!="",password:String!=""):Response
  checkTfaCode(isReset:Boolean!,isSignup:Boolean!,email:String!,tfaCode:String!):Response
  getFreshTfaCode(email:String!):Response
  signup(email:String!,password:String!):Response
  checkForgetPasswordData(email:String!):Response
  resetPassword(email:String!,oldPassword:String!,newPassword:String!):Response
  checkSignupData(email:String!):Response
  getFilteredBooks(keyword:String!,max:String!,min:String!,categories:[String]):getFilteredBooksResponse
  handleBookMark(userId:String!,wishlist:[String]!,bookId:String!,isBookMarked:Boolean!):Response
}

type getFilteredBooksResponse{
  status:Boolean!
  msg:String!
  data:[Book]
}

type Book{
  bookId: String
  name: String!
  author: String!
  image: String!
  price: Int!
  category: String!
  description: String

}

type Response {
  status:Boolean!
  msg:String!
}





`);

export default schema;
