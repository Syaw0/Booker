import filterBooks from "../../../db/utils/getFilteredBooks";
import makeQueryForDb from "../utils/makeQuery";

interface FilteredDataType {
  keyword: string;
  categories: string[];
  max: string;
  min: string;
}

const getFilteredBooks = async (data: FilteredDataType) => {
  try {
    const query = makeQueryForDb(data);
    const filterResult = await filterBooks(query, 0, 1000);
    return filterResult;
  } catch (err) {
    return {
      status: false,
      msg: "Error During Filter Books!",
      data: [],
    };
  }

  return {
    status: false,
    msg: "",
    data: [],
  };
};

export default getFilteredBooks;
