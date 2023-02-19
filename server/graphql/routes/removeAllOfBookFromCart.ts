import removeBook from "../../../db/utils/removeAllOfBookFromCart";

interface RemoveAllBookFromCartTypes {
  bookId: string;
  userId: string;
  curCart: string[];
}

const removeAllOfBookFromCart = async (data: RemoveAllBookFromCartTypes) => {
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
export default removeAllOfBookFromCart;
