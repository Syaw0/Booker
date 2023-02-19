import addToCart from "../../../db/utils/addToCart";

interface AddBookToCartTypes {
  bookId: string;
  userId: string;
  curCart: string[];
}

const addBookToCart = async (data: AddBookToCartTypes) => {
  try {
    const result = await addToCart(data.userId, data.bookId, data.curCart);
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "Error During Add Book To Cart.",
    };
  }
};
export default addBookToCart;
