import getUserById from "../../../db/utils/getUserById";
import calculatePrices from "../utils/calculatePrices";
import getCartData from "../utils/getCartData";

interface GetUpdatedCart {
  userId: string;
}

const getUpdatedCart = async ({ userId }: GetUpdatedCart) => {
  try {
    let result: any = {
      books: [],
      priceSummary: {
        shipping: "",
        subTotal: "",
        tax: "",
        total: "",
      },
      user: {
        email: "",
        password: "",
        profileUrl: "",
        userId: "",
        orders: [],
        addresses: [],
        cart: [],
        wishlist: [],
      },
    };
    const user = await getUserById(userId);

    if (user.status) {
      result.user = user.data;
      if (user.data.cart.length != 0) {
        const cart = await getCartData(user.data.cart);
        if (cart.status) {
          result.books = cart.data;
          let summary = calculatePrices(cart.data);
          result.priceSummary = summary;
        }
      }
    }

    return { status: true, msg: "OK", data: result };
  } catch (err) {
    return { status: false, msg: "Error During Update User Data!" };
  }
};

export default getUpdatedCart;
