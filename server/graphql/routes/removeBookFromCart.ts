import removeBook from "../../../db/utils/removeBookFromCart";

interface RemoveBookFromCart {
  bookId: string;
  userId: string;
  curCart: string[];
}

const removeBookFromCart = async (data: RemoveBookFromCart) => {
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
