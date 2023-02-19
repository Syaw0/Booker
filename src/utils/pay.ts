const pay = async (
  payData: [
    address: Address,
    books: BookCartCardPropsType[],
    priceSummary: PriceSummary,
    userId: string
  ]
) => {
  const address = payData[0];
  const books = payData[1];
  const priceSummary = payData[2];
  const userId = `${payData[3]}`;

  console.log(address);
  console.log(books);
  console.log(priceSummary);
  console.log(userId);

  const query = `
  query PayBooks($address:Address,$books:[BookInput],$priceSummary:PriceSummaryInput,$userId:String!){
    data:insertOrder(address:$address,books:$books,priceSummary:$priceSummary,userId:$userId){
      status
      msg
      data{
        orderId
      }
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
      variables: { address, books, priceSummary, userId },
    }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default pay;
