const deleteAddress = async (addrData: [addressId: string]) => {
  const addressId = `${addrData[0]}`;

  const query = `
    query DeleteAddress($addressId:String!){
      data:deleteAddress(addressId:$addressId){
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
    body: JSON.stringify({ query, variables: { addressId } }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default deleteAddress;
