import removeBook from "../../../db/utils/removeBookFromCart";

interface AddBookToCartTypes {
  bookId: string;
  userId: string;
  curCart: string[];
}

const removeBookFromCart = async (data: AddBookToCartTypes) => {
  try {
    const result = await removeBook(data.userId, data.bookId, data.curCart);
    return result;
  } catch (err) {
    return {
      status: false,
      msg: "Error During Add Book To Cart.",
    };
  }
};
export default removeBookFromCart;
