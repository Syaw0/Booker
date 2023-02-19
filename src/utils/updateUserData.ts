const updateUserData = async (userData: [userId: string]) => {
  const userId = `${userData[0]}`;

  const query = `
    query GetUpdatedUserData($userId:String!){
      data:updateUserData(userId:$userId){
        status
        msg
        data{
          ...USER
        }
      }
    }

    fragment USER on User{
      email
      password
      profileUrl
      userId
      orders
      addresses
      cart
      wishlist
    }
  `;

  const resp = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { userId } }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default updateUserData;
