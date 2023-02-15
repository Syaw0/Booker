import { book1, book2, book3, book4 } from "./fakeBooks";

const fakeOrder1: Order = {
  books: [book1, book1, book2, book3, book4, book1],
  date: "2022-02-01",
  orderId: "2",
  state: "delivered",
  totalPrice: "103",
};

const fakeOrder2: Order = {
  books: [book1, book1, book4, book3],
  date: "2022-02-01",
  orderId: "3",
  state: "delivered",
  totalPrice: "23",
};

const fakeOrder3: Order = {
  books: [book3, book3, book2],
  date: "2022-02-01",
  orderId: "4",
  state: "delivered",
  totalPrice: "444",
};

export { fakeOrder1, fakeOrder2, fakeOrder3 };
