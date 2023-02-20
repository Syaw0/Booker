import getFilteredBooks from "../../../db/utils/getFilteredBooks";
import makeQueryForWishList from "./makeQueryForWishlist";

const getCartData = async (cart: string[]) => {
  try {
    let cartData: any = {};
    cart.forEach((c) => {
      if (cartData[c] != null) {
        cartData[c].num += 1;
      } else {
        cartData[c] = { num: 1 };
      }
    });
    const query = makeQueryForWishList(Object.keys(cartData));
    const books = await getFilteredBooks(query, 0, 100000);
    if (books.status) {
      books.data.forEach((book: any) => {
        if (cartData[book.bookId] != null) {
          cartData[book.bookId] = {
            ...cartData[book.bookId],
            ...book,
            bookId: `${book.bookId}`,
          };
        }
      });
    } else {
      return { status: false, msg: "Error In Get Books!" };
    }

    return { status: true, msg: "", data: Object.values(cartData) };
  } catch (err) {
    return { status: false, msg: "Error During Get Cart Data!" };
  }
};

export default getCartData;
