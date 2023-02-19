import addOrder from "../../../db/utils/addOrder";

interface InsertOrderData {
  address: any;
  books: any;
  priceSummary: any;
  userId: string;
}

const insertOrder = async (data: InsertOrderData) => {
  try {
    const result = await addOrder(
      data.address,
      data.books,
      data.priceSummary,
      data.userId
    );
    return result;
  } catch {
    return { status: false, msg: "Error During Insert Order!" };
  }
};
export default insertOrder;
