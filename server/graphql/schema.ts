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
  updateUserData(userId:String!):UpdateUserDataResponse

  addBookToCart(userId:String!,bookId:String!,curCart:[String]):Response
  removeBookFromCart(userId:String!,bookId:String!,curCart:[String]):Response
  removeAllOfBookFromCart(userId:String!,bookId:String!,curCart:[String]):Response
  getUpdatedCart(userId:String!):GetUpdatedCartResponse
  addAddress(userId:String!,addressData:Address):Response
  deleteAddress(addressId:String!):Response

  getUpdatedAddresses(userId:String!):GetUpdatedAddresses
  updateAddress(addressData:Address):Response

  insertOrder(address:Address,books:[BookInput],priceSummary:PriceSummaryInput,userId:String!):InsertOrderResponse
} 

type InsertOrderResponse{
  status:Boolean!
  msg:String!
  data:InsertOrderResponseData
}
type InsertOrderResponseData{
  orderId:String!
}


type GetUpdatedAddresses{
  status:Boolean!
  msg:String!
  data:[AddressType]
}

type GetUpdatedCartResponse{
  status:Boolean!
  msg:String!
  data:GetUpdatedCartResponseData
}

type GetUpdatedCartResponseData{
  books:[Book]
  priceSummary:PriceSummary
  user:User
}


type PriceSummary{
  shipping: String!
  subTotal: String!
  tax: String!
  total:String!
}


input PriceSummaryInput{
  shipping: String!
  subTotal: String!
  tax: String!
  total:String!
}

type UpdateUserDataResponse{
  status:Boolean!
  msg:String!
  data:User
}

type User{
  email: String!,
  password: String!,
  profileUrl: String!,
  userId: String!,
  orders: [String],
  addresses: [String],
  cart: [String],
  wishlist: [String]

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
  num:Int

}

input BookInput{
  bookId: String
  name: String!
  author: String!
  image: String!
  price: Int!
  category: String!
  description: String
  num:Int
}


input Address{
  title: String!
  receiverName: String!
  state: String!
  city: String!
  street: String!
  tel: String! 
  zipCode: String! 
  country: String!
  addressId: Int
  userId:String
}

type AddressType{
  title: String!
  receiverName: String!
  state: String!
  city: String!
  street: String!
  tel: String! 
  zipCode: String! 
  country: String!
  addressId: Int
  userId:String
}

type Response {
  status:Boolean!
  msg:String!
}





`);

export default schema;
