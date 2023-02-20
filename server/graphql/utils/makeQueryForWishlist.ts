const makeQueryForWishList = (listOfBookId: string[]) => {
  if (listOfBookId.length == 0) return "";
  let query: any = listOfBookId.map((s) => `bookId="${s}"`);
  query = query.join(" or ");
  query = `(${query})`;
  return query;
};

export default makeQueryForWishList;
