const getUpdatedAddresses = async (userData: [userId: string]) => {
  const userId = `${userData[0]}`;
  const query = `
    query GetUpdatedAddresses($userId:String!){
      data:getUpdatedAddresses(userId:$userId){
        status
        msg
        data{
          ...ADDRESSES
        } 
      }
    }

    fragment ADDRESSES on AddressType{
      title
      receiverName
      state
      city
      street
      tel
      zipCode
      country
      addressId
    
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
export default getUpdatedAddresses;
