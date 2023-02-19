import removeBookFromWishlist from "../../../db/utils/removeBookFromWishlist";
import addBookToWishlist from "../../../db/utils/addBookToWishlist copy";

interface HandleBookMarkType {
  userId: string;
  wishlist: string[];
  bookId: string;
  isBookMarked: boolean;
}

const handleBookMark = async ({
  userId,
  wishlist,
  bookId,
  isBookMarked,
}: HandleBookMarkType) => {
  try {
    let result;
    if (isBookMarked) {
      result = await removeBookFromWishlist(userId, wishlist, bookId);
    } else {
      result = await addBookToWishlist(userId, wishlist, bookId);
    }

    return result;
  } catch (err) {
    return { status: false, msg: "Error During Handle Bookmark!" };
  }
};

export default handleBookMark;
