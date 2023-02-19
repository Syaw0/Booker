const changeAddress = async (addrData: [addressData: Address]) => {
  const addressData = addrData[0];

  const query = `

  query UpdateAddress($addressData:Address){
    data:updateAddress(addressData:$addressData){
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
    body: JSON.stringify({ query, variables: { addressData } }),
  });
  const json = await resp.json();
  console.log(json);
  const data = json.data.data;
  return data;
};
export const loaderMsg = "Please wait to server handle your request.";
export default changeAddress;
