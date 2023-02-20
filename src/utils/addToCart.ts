const addToCart = async (
  additionData: [userId: string, bookId: string, curCart: string[]]
) => {
  const userId = `${additionData[0]}`;
  const bookId = `${additionData[1]}`;
  const curCart = additionData[2];

  const query = `
    query AddBookToCart($userId:String!,$bookId:String!,$curCart:[String]){
      data:addBookToCart(userId:$userId,bookId:$bookId,curCart:$curCart){
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
    body: JSON.stringify({ query, variables: { userId, bookId, curCart } }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;

  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default addToCart;
