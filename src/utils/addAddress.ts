const addAddress = async (addrData: [userId: string, addressData: Address]) => {
  const userId = `${addrData[0]}`;
  const addressData = addrData[1];

  console.log(userId, addressData);
  const query = `
  query AddAddress($userId:String!,$addressData:Address){
    data:addAddress(userId:$userId,addressData:$addressData){
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
    body: JSON.stringify({ query, variables: { userId, addressData } }),
  });

  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default addAddress;
