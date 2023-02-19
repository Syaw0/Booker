const calculatePrices = (books: any) => {
  let total = 0;
  books.forEach((book: any) => {
    total += Number(book.price) * book.num;
  });

  return {
    shipping: "0",
    subTotal: "0",
    tax: "0",
    total: total,
  };
};

export default calculatePrices;
