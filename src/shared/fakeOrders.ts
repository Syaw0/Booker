import { address1, address2, address3 } from "./fakeAddresses";
import { book1, book2, book3, book4 } from "./fakeBooks";

const fakeOrder1: Order = {
  books: [book1, book1, book2, book3, book4, book1],
  date: "2022-02-01",
  orderId: "2",
  state: "delivered",
  priceSummary: { shipping: "1", subTotal: "1", tax: "1", total: "1" },
  address: address1,
};

const fakeOrder2: Order = {
  books: [book1, book1, book4, book3],
  date: "2022-02-01",
  orderId: "3",
  state: "delivered",
  priceSummary: { shipping: "1", subTotal: "1", tax: "1", total: "1" },
  address: address2,
};

const fakeOrder3: Order = {
  books: [book3, book3, book2],
  date: "2022-02-01",
  orderId: "4",
  state: "delivered",
  priceSummary: { shipping: "1", subTotal: "1", tax: "1", total: "1" },
  address: address3,
};

export { fakeOrder1, fakeOrder2, fakeOrder3 };
