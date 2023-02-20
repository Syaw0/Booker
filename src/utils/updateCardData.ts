const updateCartData = async (userData: [userId: string]) => {
  const userId = `${userData[0]}`;
  const query = `
    query GetUpdatedCartData($userId:String!){
      data:getUpdatedCart(userId:$userId){
        status
        msg
        data{
          ...CART_DATA
        } 
      }
    }

    fragment CART_DATA on GetUpdatedCartResponseData{
      books{
        ...BOOK
      }
      priceSummary{
        ...PRICE_SUMMARY
      }
      user{
        ...USER
      }
    }

    fragment BOOK on Book{
      bookId
      name
      author
      image
      price
      category
      description
      num
    }

    fragment PRICE_SUMMARY on PriceSummary{
      shipping
      subTotal
      tax
      total
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
export default updateCartData;
